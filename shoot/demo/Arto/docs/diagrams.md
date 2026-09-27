# Diagrams

Mermaid diagrams are drawn in the page as you reach them, and any of them
opens in a window of its own with zoom, pan and copy-as-image.

## How a window opens a document

```mermaid
sequenceDiagram
    participant CLI as arto README.md
    participant Socket as Unix socket
    participant App as Running instance
    participant Win as Window
    CLI->>Socket: open request
    Socket->>App: route to the instance
    App->>Win: create or reuse
    Win->>Win: render, restore position
    Win-->>CLI: ready
```

## The life of a lens

```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Asking: open
    Asking --> Answered: agent finishes
    Asking --> Stopped: stop
    Stopped --> Asking: continue
    Answered --> Outdated: document changes
    Outdated --> Asking: regenerate
    Answered --> Hidden: hide
    Hidden --> Answered: show
```

## Where the time goes

```mermaid
pie showData
    title Reading a spec
    "Prose" : 62
    "Code" : 18
    "Diagrams" : 12
    "Tables" : 8
```
