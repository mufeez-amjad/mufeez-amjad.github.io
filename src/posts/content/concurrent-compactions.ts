export const content = `

*This post describes my implementation of [concurrent manual compactions](https://github.com/cockroachdb/pebble/issues/1404) in Pebble during my internship at Cockroach Labs in 2022.*

\n &nbsp;

Before we dive into the details of the project, let’s first understand the storage engine of [Pebble](https://github.com/cockroachdb/pebble), a key-value store inspired by RocksDB/LevelDB and the storage engine for CockroachDB.

### Storage Essentials

![storage internals](./posts/compaction/storage-essentials.png)

The core of Pebble is a _log-structured merge tree_ (LSM) with six levels, and an in-memory data structure called the _memtable_ that sits above.

New entries or edits are created as new files, so we can perform sequential IO rather than random IO (faster). These files are called _SSTables_ (Sorted String Tables) and are a list of consecutive key-value pairs sorted in key order and are **immutable**.

\n &nbsp;

For the sake of explanation, let’s consider a \`SET\` and \`READ\` operation.

\`SET\`:
- An entry is added to the _write-ahead-log_ (WAL) and then added in sorted-order to the memtable. 
    - In the event of a crash, we can recover the memtable state by replaying the WAL.
- When the memtable reaches a certain size threshold, it is flushed to disk, creating immutable SSTables.

\`READ\`:
- Because we don't know which SSTable has the latest value, we have to check each SSTable in order. This is known as **read amplification**.
    - We check the entries in reverse chronological order (top down with regards to the LSM), thus starting with the memtable and ending in L6.
- An optimization to reduce read amplification is to have a bloom filter for each SSTable, which is a probabilistic data structure that tells us if a key is present in the SSTable.

\n &nbsp;

Ideally, we want to keep our LSM in a pyramid shape (▲) to minimize:
- read amplification (the amount of data read from disk), achieved by having the fewest number of SSTs to check
- write amplification (the amount of data written to disk), achieved by having the fewest number of SSTs to compact (more below)
- space amplification (the amount of data stored on disk), achieved by having the fewest number of SSTs on disk

To achieve this, we want to combine redundant SSTs and push them to lower levels; this is done through **compactions**.

\n &nbsp;

## Manual Compactions

Compactions are done both automatically and manually, where the former is done in the background and the latter is ad-hoc. We will be discussing manual compactions.

When a workload adds files to L0 faster than they can be compacted out, a large number of files accumulate in L0 and lead to an inverted LSM.
A manual compaction can be used in this scenario to help return the LSM to a pyramid shape.

CockroachDB allows running manual compactions either through the SQL shell or through the Pebble instance directly.

Online (Blocking SQL command):
~~~sql
SELECT crdb_internal.compact_engine_span(<nodeID>, <storeID>, decode('00', 'hex'), decode('FFFFFFFF', 'hex'));
~~~

Offline (node is taken offline):
~~~zsh
./cockroach debug compact
~~~

\n &nbsp;

Let's consider a simple example of a manual compaction:

<div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap">
	<img src="./posts/compaction/compact1.png" alt="compaction" style="width: 150px" />
	<img src="./posts/compaction/compact2.png" alt="compaction" style="width: 150px" />
	<img src="./posts/compaction/compact3.png" alt="compaction" style="width: 150px" />
	<img src="./posts/compaction/compact4.png" alt="compaction" style="width: 150px" />
	<img src="./posts/compaction/compact5.png" alt="compaction" style="width: 150px" />
	<img src="./posts/compaction/compact6.png" alt="compaction" style="width: 150px" />
	<img src="./posts/compaction/compact7.png" alt="compaction" style="width: 150px" />
</div>

In the above sequence of images, you can see the manual compaction proceed from L0 to L1, L1 to L2, and so on. 
While compacting, the size of the LSM reduces as we combine redundant keys and push them to lower levels.

\n &nbsp;

### Motivation

Before my changes, manual compactions were done serially level by level, i.e. L0 to L1, then L1 to L2, etc. 
When a node is taken offline, we don't need to be considerate for any foreground traffic – 
thus allowing us to make full use of the available system resources.

As an anecdote, during this project, we encountered a customer who was manually compacting a database several petabytes in size. The process had been running for **6 days(!)**, highlighting the urgency of the issue.

\n &nbsp;

### Implementation

The main performance optimization opportunity was to parallelize the compactions. To do this, we'd need to:
1. Segment the key space into non-overlapping key ranges
2. Execute the compactions in parallel
3. Synchronize their completion

By segmenting the key ranges, we can ensure that only one concurrent compaction is operating (reading/writing) on a particular key range at a time.

Here is a stub of the method we will incrementally fill in:

~~~go
func (d *DB) manualCompact(start, end []byte, level int, parallelize bool) error {
	// 1. Split the compaction range into non-overlapping key ranges

    // 2. Execute the compactions in parallel

    // 3. Synchronize their completion
}
~~~

\n &nbsp;

#### 1. Key-space Segmentation

Pebble has a function to calculate the distinct key ranges across 2 levels: \`calculateInuseKeyRanges\` ([implementation](https://github.com/mufeez-amjad/pebble/blob/2c7b5358bae4b247887667c0941d98cad1cddd69/compaction.go#L646)).

With that, we can split up the compaction range of a particular level into non-overlapping key ranges:

~~~go
// splitManualCompaction splits a manual compaction over [start,end] on level
// such that the resulting compactions have no key overlap.
//
// d.mu must be held when calling this.
func (d *DB) splitManualCompaction(
	start, end []byte, level int,
) (splitCompactions []*manualCompaction) {
	curr := d.mu.versions.currentVersion()
	endLevel := level + 1
	if level == 0 {
        // If we are compacting from L0, compact to Lbase instead of level+1
		endLevel = d.mu.versions.picker.getBaseLevel()
	}

    // Get non-overlapping key ranges
	keyRanges := calculateInuseKeyRanges(curr, d.cmp, level, endLevel, start, end)

	for _, keyRange := range keyRanges {
		splitCompactions = append(splitCompactions, &manualCompaction{
			level: level,
            // Use a channel to signal completion, more on this later!
			done:  make(chan error, 1),
			start: keyRange.Start,
			end:   keyRange.End,
			split: true,
		})
	}

	return splitCompactions
}
~~~

We call the above method in \`db.manualCompact\`:

~~~go
func (d *DB) manualCompact(start, end []byte, level int, parallelize bool) error {
    d.mu.Lock()

	var compactions []*manualCompaction
	if parallelize {
        // Get non-overlapping compactions
		compactions = append(compactions, d.splitManualCompaction(start, end, level)...)
	} else {
		compactions = append(compactions, &manualCompaction{
			level: level,
			done:  make(chan error, 1),
			start: start,
			end:   end,
		})
	}

    // Execute the compactions...
}
~~~

\n &nbsp;

#### 2. Parallel Execution

We now have multiple compactions for a single level that don't have overlapping key ranges, let's execute them!

To execute the compactions, we add them to a queue and then attempt to schedule them for execution:

~~~go
func (d *DB) manualCompact(start, end []byte, level int, parallelize bool) error {
    d.mu.Lock()

	var compactions []*manualCompaction // non-overlapping compactions from previous step

    d.mu.compact.manual = append(d.mu.compact.manual, compactions...)
	d.maybeScheduleCompaction()
    d.mu.Unlock()
}
~~~

\n &nbsp;

\`maybeScheduleCompaction\` will schedule the compactions for execution. 

\`pickManual\` returns a \`*pickedCompaction\` representing a compaction that has been picked for execution, 
with verified compaction input/output levels and protection against running a conflicting compaction.

That \`*pickedCompaction\` is then turned into a \`*compaction\` which can be directly executed by Pebble.

~~~go
// maybeScheduleCompaction schedules a compaction if necessary
//
// d.mu must be held when calling this.
func (d *DB) maybeScheduleCompaction() {
    ...

	for len(d.mu.compact.manual) > 0 && d.mu.compact.compactingCount < d.opts.MaxConcurrentCompactions {
		manual := d.mu.compact.manual[0]

        // Check if we can run the compaction
        pc, retryLater := d.mu.versions.picker.pickManual(env, manual)
		if pc != nil {
			c := newCompaction(pc, d.opts, env.bytesCompacted)
            
            // Pop from the queue
			d.mu.compact.manual = d.mu.compact.manual[1:]

            // Add to currently executing compactions
			d.addInProgressCompaction(c)

            // Concurrently execute the compaction
			go d.compact(c, manual.done)
		} else if !retryLater {
            // Drop the compaction
			d.mu.compact.manual = d.mu.compact.manual[1:]
			manual.done <- nil // Don't forget to send to the channel!
		} else {
            ...
		}
	}

    ...
}
~~~

\`d.compact\` runs the picked concurrent manual compaction and sends to the \`done\` channel to signal completion.

\n &nbsp;

#### 3. Synchronize completion

With manual compactions we need to ensure all compactions for a particular level complete before proceeding to the next level. 
As mentioned above we use a go channel to accomplish this.

This completes our \`manualCompact\` function:

~~~go
// Compacts the given level of the LSM between start and end.
func (d *DB) manualCompact(start, end []byte, level int, parallelize bool) error {
	d.mu.Lock()
    
    // If level is empty, return early

	var compactions []*manualCompaction
	if parallelize {
        // Get non-overlapping compactions
		compactions = append(compactions, d.splitManualCompaction(start, end, level)...)
	} else {
		compactions = append(compactions, &manualCompaction{
			level: level,
			done:  make(chan error, 1),
			start: start,
			end:   end,
		})
	}

	d.mu.compact.manual = append(d.mu.compact.manual, compactions...)
	d.maybeScheduleCompaction()
	d.mu.Unlock()

	// Each of the channels is guaranteed to be eventually sent to once. After a
	// compaction is possibly picked in d.maybeScheduleCompaction(), either the
	// compaction is dropped, executed after being scheduled, or retried later.
	// Assuming eventual progress when a compaction is retried, all outcomes send
	// a value to the done channel. Since the channels are buffered, it is not
	// necessary to read from each channel, and so we can exit early in the event
	// of an error.
	for _, compaction := range compactions {
		if err := <-compaction.done; err != nil {
			return err
		}
	}
	return nil
}
~~~

\n &nbsp;

Finally, we run the concurrent manual compactions level by level in the main compaction method:

~~~go
// Compacts the entire LSM between start and end.
func (d *DB) Compact(start, end []byte, parallelize bool) error {
	d.mu.Lock()
 
    // Find Lbase (lowest non-empty level of LSM)
	maxLevelWithFiles := 1
	for level := 0; level < numLevels; level++ {
		overlaps := // if SSTs in \`level\` have overlap with start-end
		if !overlaps.Empty() {
			maxLevelWithFiles = level + 1
		}
	}

	// Determine if any memtable overlaps with the compaction range. We wait for
	// any such overlap to flush (initiating a flush if necessary).

    d.mu.Unlock()

	for level := 0; level < maxLevelWithFiles; {
		if err := d.manualCompact(iStart.UserKey, iEnd.UserKey, level, parallelize); err != nil {
			return err
		}
		level++

		if level == numLevels-1 {
			// A manual compaction of the bottommost level occurred.
			// There is no next level to try and compact.
			break
		}
	}
	return nil
}
~~~

## Benchmarking and Results

While it would have been ideal to run these benchmarks programmatically, the precondition for the use of a manual compaction is an inverted LSM.

Thus, I seeded an LSM with the YCSB F workload which inserts keys following a zipf distribution (higher frequency of key ranges). Workload F is a write-heavy workload and is known to lead to an inverted LSM when using a large number of concurrent writers.

Here is the LSM after seeding:

~~~text
__level_____count____size___score______in__ingest(sz_cnt)____move(sz_cnt)___write(sz_cnt)____read___r-amp___w-amp
    WAL         3   138 M       -     0 B       -       -       -       -   138 M       -       -       -     0.0
      0     69428    84 G    3.02     0 B     0 B       0     0 B       0     0 B       0     0 B       0     0.0
      1         0     0 B    0.00     0 B     0 B       0     0 B       0     0 B       0     0 B       0     0.0
      2      2478   9.7 G    5.45     0 B     0 B       0     0 B       0     0 B       0     0 B       0     0.0
      3      1975    12 G    5.72     0 B     0 B       0     0 B       0     0 B       0     0 B       0     0.0
      4      1497    15 G    5.73     0 B     0 B       0     0 B       0     0 B       0     0 B       0     0.0
      5       961    18 G    0.87     0 B     0 B       0     0 B       0     0 B       0     0 B       0     0.0
      6       703    15 G       -     0 B     0 B       0     0 B       0     0 B       0     0 B       0     0.0
  total     77042   154 G       -   138 M     0 B       0     0 B       0   138 M       0     0 B       0     1.0
  flush         0
compact         0   583 G     0 B       0          (size == estimated-debt, score = in-progress-bytes, in = num-in-progress)
  ctype         0       0       0       0       0  (default, delete, elision, move, read)
 memtbl        39   144 M
zmemtbl         0     0 B
   ztbl         0     0 B
 bcache         0     0 B    0.0%  (score == hit-rate)
 tcache         0     0 B    0.0%  (score == hit-rate)
  snaps         0       -       0  (score == earliest seq num)
 titers         0
 filter         -       -    0.0%  (score == utility)
~~~

You can see that L0 alone makes up more than half of the total size of the LSM. This is a clear indication of an inverted LSM. 

After seeding an inverted LSM of around 150 GB, I ran the manual compactions with and without parallelization:

| Implementation | Times                                      |
|:--------------:|:------------------------------------------:|
| Serial         | **Real:** 550m32.809s<br>**User:** 589m52.219s<br>**Sys:** 36m25.205s  |
| Concurrent     | **Real:** 384m56.152s<br>**User:** 373m0.258s<br>**Sys:** 28m25.139s   |

The results were promising with a roughly 30% improvement in compaction time!

While the performance improvement is significant, the compaction logs when benchmarking revealed that the majority of the time is spent in L0 to Lbase compactions. 
My implementation was [extended](https://github.com/cockroachdb/pebble/pull/1604#issue-1182237405) to use L0 sublevels to further parallelize compactions in L0, yielding an additional 92% improvement in overall compaction time! 
Kudos to Arjun Nair for the follow-up work.

## Conclusion

All in all, this project was my first large contribution to CockroachDB and the performance improvements were significant and impactful. Compactions are still an active work area in Pebble and I’m excited to see the future optimizations that the team will come up with.
`;

export default {
	slug: 'pebble-concurrent-compactions',
	title: 'Concurrent manual compactions',
	description: 'Segmenting key space and parallelizing execution, 30% perf improvement',
	date: 'July 15, 2024',
	content,
	hero: './posts/compaction/hero.png'
};
