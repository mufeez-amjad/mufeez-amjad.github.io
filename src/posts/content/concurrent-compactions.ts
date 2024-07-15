export const content = `

*The contents of this post describe the implementation of [concurrent manual compactions](https://github.com/cockroachdb/pebble/issues/1404) in Pebble.*

Before we dive into the details of the project, let’s first understand the storage engine of [Pebble](https://github.com/cockroachdb/pebble), a key-value store inspired by RocksDB/LevelDB and the storage engine for CockroachDB.

\n &nbsp;

### Storage Essentials

![storage internals](../../posts/storage-essentials.png)

The core of Pebble is a _log-structured merge tree_ (LSM) with six levels, and an in-memory data structure called the _memtable_ that sits above.

New entries or edits are created as new files, so we can perform sequential IO rather than random IO (faster). These files are called _SSTables_ (Sorted String Tables) and are a list of consecutive key-value pairs sorted in key order and are **immutable**.

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

### Motivation

Before my changes, manual compactions were done level by level, i.e. L0 to L1, L1 to L2, etc. When a node is taken offline, we don't need to be considerate for any foreground traffic – thus allowing us to make full use of the available system resources.

\n &nbsp;

### Implementation

We can execute manual compactions in parallel if we split the compacting range into non-overlapping key-ranges. This is to prevent any 2 compactions reading or writing to the same key space.

Suppose we have these 5 SSTs in level L and level L + 1. Because n-o and p-q will write to the same key range m-q, we want to group that into one compaction. If we didn’t, two compaction threads could simultaneously modify the SST with range m-q.

So the final compacting ranges will be a-c, m-q, and s-w. 

We then compact these 3 ranges in parallel, and synchronize their completion.

### Results and next steps

After running some benchmarks with LSMs of around 200 GB, I observed a roughly 30% improvement. 

Unfortunately, in practice, most of the time spent compacting an LSM is an L0 to Lbase compaction which is difficult to parallelize. That’s because with thousands of files in L0, there’s high overlap between files and thus difficult to pick more than one non-overlapping key range. 

One investigation that came out of this project was to look into how to parallelize compactions out of L0 and there’s an [issue](https://github.com/cockroachdb/pebble/issues/1533) tracking it
`

export default {
    slug: 'pebble-concurrent-compactions',
    title: 'Concurrent manual compactions',
    description: 'Segmenting keyspace and parallelizing execution with goroutines',
    date: '2024-07-15',
    content,
    hero: '../../posts/compaction.png'
};
