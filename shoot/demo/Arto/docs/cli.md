# Command line

Arto is a desktop application; the `arto` command is how you hand files to it
from a terminal.

## Opening files

```sh
arto                     # Launch Arto (shows the welcome page)
arto README.md           # Open a file
arto docs/               # Open a directory in the file explorer
arto a.md b.md           # Open two files, one window each
```

Arto runs as a single instance: if it is already running, the command hands
the request over rather than starting a second one.

## Placing a window

```sh
arto --position=120,120 --size=1400,920 --theme=light README.md
arto --wait-ready README.md
```

`--wait-ready` holds the command until the window has finished drawing, so a
script that takes a screenshot needs no sleep.

## Rendering a page

```sh
arto page README.md > README.html
```

The page carries the stylesheet, diagrams and math inline, and opens in any
browser without the app. See [the architecture](architecture.md) for where
`arto-page` sits.
