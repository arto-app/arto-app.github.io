---
rfc: 2
title: Reading closely
status: draft
---

# RFC 0002 — Reading closely

## Summary

Help a reader who comes back to a document: show what changed since they last
read it, let them mark what matters, and keep the block they are reading in
view.

## Motivation

Arto is mostly used to read documents that someone else keeps rewriting —
plans, specs, notes. When one of them is opened again, the reader has to
either read all of it again or guess what moved.

## Design

### Changes since last read

Keep the version a reader last read, and mark the blocks that differ from it
in the margin.

### Highlights

Let a reader highlight a passage and attach a note to it.

## Open questions

- How long should an old version be kept?

## See also

- [RFC 0001 — One document to a window](0001-document-windows.md)
- [Reading well](../Notes/reading-well.md)
