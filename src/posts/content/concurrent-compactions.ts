export const content = `

*The contents of this post describe the implementation of concurrent manual compactions in Pebble, a key-value store.*

Before we dive into the details of the project, let’s first understand the storage engine of Pebble, a key-value store inspired by RocksDB/LevelDB.

\n &nbsp;

### Storage Essentials

The storage engine at its core is a log-structured merge tree that organizes files and allows for more performant reads and writes. 
There are 6 levels to the LSM, and there’s an in-memory data structure called the memtable that can be thought to be above L0. 
New entries or edits are created as new files, so we can perform sequential IO rather than random IO.

Let’s say we perform a SET operation. An entry is added in sorted-order to a memtable which is only persisted in memory. 
In the event of a crash, we would need to recover the memtable state by replaying the associated write-ahead-log file.

When the memtable reaches a certain size threshold, it is flushed to disk, creating immutable SSTables. 
SSTs are a list of consecutive key-value pairs sorted in key order and are guaranteed to be non-overlapping when in Levels L1 to L6.

If we want to read a key, we have to check the entries in reverse chronological order, or top down with regards to the LSM. 
So that means we’d start with the memtable and end in L6.

Because files in L0 can overlap, we’d have to read both files before determining if we have the latest value of a key.

As we’re introducing new SSTs, we want our LSM to maintain a pyramid shape to be performant with reads. 
Because of this we want to push SSTs from higher levels to lower levels, and this utilizes compactions. 
A compaction collapses multiple updates of the same key and keeps keeps the latest value, 
and can also take multiple SSTs as input and produce one or more SSTs in the output level.

Now that we have a sufficient understanding of storage internals, we can discuss my project - concurrent manual compactions.


`

export default {
    slug: 'pebble-concurrent-compactions',
    title: 'Concurrent manual compactions',
    description: 'Segmenting keyspace and parallelizing execution with goroutines',
    date: '2024-07-15',
    content,
    hero: '../../posts/compaction.png'
};
