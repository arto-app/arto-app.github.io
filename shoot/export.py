#!/usr/bin/env python3
"""Export Studio projects on the Desktop to MP4, as CleanShot renders them.

    python3 export.py light motion-panel demo-reading
    python3 export.py dark all

Exporting through CleanShot, rather than taking the raw recording, keeps
whatever was added in the editor — zoom, background, the drawn cursor.
Projects are exported in place, so run it after the editing is done.
"""
import shutil
import sys

from arto import CAPTURES, MEDIA, close_studio, osa, sh, wait


def export(theme: str, name: str) -> None:
    project = CAPTURES / theme / "clips" / f"{name}.cleanshotvideo"
    target = CAPTURES / theme / "exports" / f"{name}.mp4"
    target.parent.mkdir(parents=True, exist_ok=True)
    before = set(MEDIA.glob(f"*/{name}.mp4"))

    close_studio()
    sh("open", str(project))
    wait(3.0)
    osa(
        'tell application "System Events" to tell process "CleanShot X"\n'
        f'click button "Export" of group 1 of toolbar 1 of window "{name}"\nend tell'
    )
    # The dialog's own Export button, as opposed to the toolbar's; it takes
    # a moment to appear, and it is not always the front window when it does.
    for _ in range(20):
        wait(0.5)
        pressed = osa(
            'tell application "System Events" to tell process "CleanShot X"\n'
            "repeat with w in (every window)\n"
            "try\n"
            'click (first button of w whose name is "Export")\n'
            'return "pressed"\n'
            "end try\n"
            "end repeat\n"
            'return ""\nend tell'
        )
        if pressed:
            break
    else:
        raise RuntimeError(f"the export dialog for {name} never appeared")
    for _ in range(600):
        new = set(MEDIA.glob(f"*/{name}.mp4")) - before
        if new:
            break
        wait(0.5)
    else:
        raise RuntimeError(f"no export appeared for {name}")
    src = new.pop()
    # The file appears when rendering starts; wait until it stops growing.
    size = -1
    while src.stat().st_size != size:
        size = src.stat().st_size
        wait(1.5)
    shutil.move(str(src), target)
    close_studio()
    print(target)


def main() -> None:
    theme, *names = sys.argv[1:]
    if names == ["all"]:
        names = sorted(p.stem for p in (CAPTURES / theme / "clips").glob("*.cleanshotvideo"))
    for name in names:
        export(theme, name)


if __name__ == "__main__":
    main()
