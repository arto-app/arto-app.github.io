---
rfc: 2
title: Reading closely
status: in review
---

# RFC 0002 — Reading closely

## Summary

Help a reader who comes back to a document: show what changed since they last
read it, let them mark what matters, and keep the block they are reading in
view.

## Motivation

Arto is mostly used to read documents that someone else keeps rewriting —
plans, specs, notes. When one of them is opened again, the reader has to
either read all of it again or guess what moved. Git shows the raw text, but
not the rendered page, and not for files outside a repository.

## Design

### Changes since last read

Keep the version a reader last read, and on the next open mark every block
added or rewritten since with a line in the margin. Where text was taken out,
draw a hairline. Put a dot on the headings in the contents list that the
changes fall under, so a long document can be walked change by change.

### Highlights

Let a reader highlight a passage and attach a note to it.

### Focus mode

Dim every block but the one in the middle of the window, and let the line
keys step from block to block.

## Open questions

- Should whitespace-only edits be marked?

## See also

- [RFC 0001 — One document to a window](0001-document-windows.md)
- [Reading well](../Notes/reading-well.md)
