#!/usr/bin/env python3
"""Replace Arto's state with the demo set the site is photographed against.

The reader's own state is copied aside first and put back by restore.py.
Arto must not be running: it writes its state on quit, over whatever this
script wrote.
"""
import json
import shutil
import subprocess
import sys
import uuid
from datetime import datetime, timedelta
from pathlib import Path

HERE = Path(__file__).resolve().parent
HOME = Path.home()
DOCS = HOME / "Documents"
STATE = HOME / "Library/Application Support/arto"
BACKUP = HOME / "Library/Application Support/arto-backup/before-shoot"
DEMO_ROOTS = ["Arto", "Notes", "rfcs"]

# Newest first, as visits.json keeps them: (days ago, hh:mm, path under DOCS).
VISITS = [
    (0, "18:49", "Arto/docs/rendering.md"),
    (0, "18:48", "Arto/docs/architecture.md"),
    (0, "18:48", "Arto/docs/markdown.md"),
    (0, "18:38", "Arto/docs/images.md"),
    (0, "18:37", "Arto/docs/diagrams.md"),
    (0, "13:27", "Notes/typography.md"),
    (0, "10:57", "Arto/README.md"),
    (1, "14:37", "rfcs/0001-document-windows.md"),
    (1, "12:07", "Notes/reading-list.md"),
    (1, "10:37", "Arto/docs/cli.md"),
    (3, "16:12", "Arto/docs/keybindings.md"),
    (4, "11:40", "Arto/CONTRIBUTING.md"),
    (5, "09:15", "Arto/docs/installation.md"),
]
BOOKMARKS = ["Arto", "Notes", "rfcs", "Notes/typography.md"]
# Opened from the keyboard while shooting; the context menu is harder to drive.
LENS_SHORTCUTS = {
    "translate": "Ctrl+Alt+t",
    "summarize": "Ctrl+Alt+s",
    "explain-terms": "Ctrl+Alt+e",
    "explain-block": "Ctrl+Alt+b",
}
PINNED = [("engine", "green"), ("formulas", "blue"), ("matrix", "pink")]


def arto_running() -> bool:
    return subprocess.run(["pgrep", "-x", "arto"], capture_output=True).returncode == 0


def write_json(path: Path, value) -> None:
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n")


def main() -> None:
    if arto_running():
        sys.exit("Quit Arto first: it writes its state on quit, over this script's.")
    if BACKUP.exists():
        sys.exit(f"{BACKUP} already exists; run restore.py before setting up again.")

    shutil.copytree(STATE, BACKUP)

    for root in DEMO_ROOTS:
        target = DOCS / root
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(HERE / "demo" / root, target)

    config = json.loads((STATE / "config.json").read_text())
    config["directory"]["defaultDirectory"] = str(DOCS / "Arto")
    config["theme"]["lightTheme"] = "light"
    config["theme"]["darkTheme"] = "dark"
    for lens in config.get("lenses", []):
        if lens["id"] in LENS_SHORTCUTS:
            lens["shortcut"] = LENS_SHORTCUTS[lens["id"]]
    write_json(STATE / "config.json", config)
    # A reader's own mappings.json may predate actions the site shows, so the
    # shots are taken with the stock Default preset, as a new reader has it.
    shutil.copyfile(HERE / "mappings.json", STATE / "mappings.json")

    today = datetime.now().astimezone().replace(second=0, microsecond=0)
    visits = []
    for days, clock, rel in VISITS:
        hour, minute = map(int, clock.split(":"))
        at = (today - timedelta(days=days)).replace(hour=hour, minute=minute)
        visits.append(
            {
                "path": str(DOCS / rel),
                "at": at.isoformat(),
                "anchor": {"line": 1, "fraction": 0.0},
            }
        )
    write_json(STATE / "visits.json", {"items": visits})
    write_json(STATE / "bookmarks.json", {"items": [{"path": str(DOCS / p)} for p in BOOKMARKS]})
    write_json(
        STATE / "pinned-searches.json",
        {
            "version": 1,
            "pinnedSearches": [
                {
                    "id": "ps_" + uuid.uuid4().hex,
                    "pattern": pattern,
                    "color": color,
                    "caseSensitive": False,
                    "disabled": False,
                    "createdAt": today.isoformat(),
                }
                for pattern, color in PINNED
            ],
        },
    )

    state = json.loads((STATE / "state.json").read_text())
    state.update(
        directory=str(DOCS / "Arto"),
        temps=[],
        sidebarPinned=False,
        contentFullWidth=False,
        zoomLevel=1.0,
    )
    write_json(STATE / "state.json", state)

    for name in ["highlights", "baselines", "lenses"]:
        shutil.rmtree(STATE / name, ignore_errors=True)
        (STATE / name).mkdir()

    print(f"demo state written; the reader's own is in {BACKUP}")


if __name__ == "__main__":
    main()
