---
rfc: 1
title: One document to a window
status: accepted
---

# RFC 0001 — One document to a window

## Summary

A window shows exactly one document. Opening another document opens another
window.

## Motivation

Tabs made a window a container for a session rather than for a document. The
document you wanted was behind a strip of truncated titles, and the window
title named only whichever tab happened to be in front.

## Design

- Every window owns one document and names it in its title.
- `arto a.md b.md` opens two windows.
- The palette opens a document in the window you are in; `⌘⇧Enter` opens it
  in a new one.

## Drawbacks

A reader who kept twenty tabs now has twenty windows. The palette and the
reading history are the answer: neither needs the document to stay open.

## See also

- [Architecture](../Arto/docs/architecture.md)
- [RFC 0002 — Reading closely](0002-reading-closely.md)
