#!/usr/bin/env python3
"""Put back the Arto state setup.py set aside, and remove the demo documents."""
import shutil
import subprocess
import sys
from pathlib import Path

from setup import BACKUP, DEMO_ROOTS, DOCS, STATE


def main() -> None:
    if subprocess.run(["pgrep", "-x", "arto"], capture_output=True).returncode == 0:
        sys.exit("Quit Arto first: it writes its state on quit, over the restored one.")
    if not BACKUP.exists():
        sys.exit(f"nothing to restore: {BACKUP} does not exist")
    shutil.rmtree(STATE)
    shutil.move(str(BACKUP), str(STATE))
    for root in DEMO_ROOTS:
        shutil.rmtree(DOCS / root, ignore_errors=True)
    print("the reader's Arto state is back, and the demo documents are gone")


if __name__ == "__main__":
    main()
