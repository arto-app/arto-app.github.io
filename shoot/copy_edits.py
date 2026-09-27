#!/usr/bin/env python3
"""Copy the Studio edits (zooms, background, cursor) of one .cleanshotvideo onto another.

    python3 copy_edits.py demo-reading        # light's edits onto dark's
    python3 copy_edits.py SRC.cleanshotvideo DST.cleanshotvideo

Both themes are recorded from the same script, so a zoom set on one lands on
the same moment and the same place in the other. Opening the target project
in CleanShot afterwards shows the copied edits; the editor must not have it
open while this runs, or its next save undoes them.
"""
import json
import subprocess
import sys
import uuid
from pathlib import Path

EDIT_KEYS = [
    "zooms",
    "background",
    "backgroundPaddingPercent",
    "backgroundShadowIntensity",
    "cornerRadius",
    "motionBlur",
    "zoomAnimationStyle",
    "resizeCameraDuringZoom",
    "showCursor",
    "cursorScale",
    "cursorStyle",
    "cursorMovementStyle",
    "cursorPressEffect",
    "cursorClickEffect",
    "hideCursorWhenNotMoving",
    "hideCursorWhenTyping",
    "showKeystrokes",
    "keystrokesStyle",
    "keystrokesPosition",
    "keystrokesScale",
    "keystrokesDisplayAll",
]


def recorded_length(project: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
         str(project / "files" / "video.mov")],
        check=True, capture_output=True, text=True,
    ).stdout
    return float(out)


def main(src: str, dst: str) -> None:
    source = json.loads((Path(src) / "document.json").read_text())
    target_path = Path(dst) / "document.json"
    target = json.loads(target_path.read_text())
    for key in EDIT_KEYS:
        if key in source:
            target[key] = source[key]
    # The trims: each clip is a span of the recording, so the same spans cut
    # the other theme's take at the same moments. A span running past the end
    # of the shorter take is cut short there.
    length = recorded_length(Path(dst))
    clips = []
    for clip in source["clips"]:
        start = clip["startTime"]
        if start >= length:
            continue
        clips.append({**clip, "id": str(uuid.uuid4()).upper(),
                      "duration": min(clip["duration"], length - start)})
    target["clips"] = clips
    # Zooms are timed against the recording, not against the trimmed cut.
    duration = length
    # Each zoom needs an id of its own, and must end inside the target's recording.
    target["zooms"] = [
        {
            **zoom,
            "id": str(uuid.uuid4()).upper(),
            "endTimestamp": min(zoom["endTimestamp"], duration),
        }
        for zoom in source.get("zooms", [])
        if zoom["startTimestamp"] < duration
    ]
    target_path.write_text(json.dumps(target, separators=(",", ":")))
    print(f"copied {len(target['zooms'])} zoom(s) and the background onto {dst}")


if __name__ == "__main__":
    if len(sys.argv) == 2:
        from arto import CAPTURES

        name = sys.argv[1]
        main(
            str(CAPTURES / "light" / "clips" / f"{name}.cleanshotvideo"),
            str(CAPTURES / "dark" / "clips" / f"{name}.cleanshotvideo"),
        )
    else:
        main(sys.argv[1], sys.argv[2])
