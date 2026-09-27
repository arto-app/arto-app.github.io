#!/usr/bin/env python3
"""Turn the captures on the Desktop into the site's assets.

    python3 publish.py             # both themes
    python3 publish.py light       # one, while the other is still to shoot

Stills become lossless WebP under public/images; exported clips become H.264
under public/videos, each with its first frame as a WebP poster. Every asset
is written for both themes, and its pixel size is printed so it can be
recorded in app/lib/image-size.ts.
"""
import json
import subprocess
import sys
from pathlib import Path

from arto import CAPTURES

SITE = Path(__file__).resolve().parent.parent
IMAGES = SITE / "public/images"
VIDEOS = SITE / "public/videos"

# Parts of a still enlarged over it by ZoomFigure: (inset, base, x, y, w, h,
# scale). Chrome does not zoom with the document, so the ruler is enlarged
# here rather than shot larger.
CROPS = [
    ("reading-time-header", "reading-time", 835, 30, 251, 50, 1),
    ("gutter", "pinned", 1028, 396, 69, 83, 4.93),
]


def ffmpeg(*args: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def size(path: Path) -> tuple[int, int]:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height", "-of", "json", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout
    stream = json.loads(out)["streams"][0]
    return stream["width"], stream["height"]


def still(src: Path, dst: Path, crop: str | None = None) -> None:
    args = ["-i", str(src)]
    if crop:
        args += ["-vf", crop]
    ffmpeg(*args, "-c:v", "libwebp", "-lossless", "1", "-compression_level", "6", str(dst))


def clip(src: Path, dst: Path, poster: Path) -> None:
    # Even dimensions for yuv420p; faststart so playback begins before the
    # whole file has arrived.
    ffmpeg(
        "-i", str(src), "-an",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:v", "libx264", "-preset", "slow", "-crf", "22",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(dst),
    )
    ffmpeg("-i", str(dst), "-frames:v", "1", "-c:v", "libwebp", "-quality", "90", str(poster))


def main() -> None:
    sizes: dict[str, tuple[int, int]] = {}
    for theme in sys.argv[1:] or ["light", "dark"]:
        stills = CAPTURES / theme / "stills"
        for src in sorted(stills.glob("*.png")):
            dst = IMAGES / f"{src.stem}-{theme}.webp"
            still(src, dst)
            sizes[src.stem] = size(dst)
        for inset, base, x, y, w, h, scale in CROPS:
            dst = IMAGES / f"{inset}-{theme}.webp"
            vf = f"crop={w}:{h}:{x}:{y}"
            if scale != 1:
                vf += f",scale={round(w * scale)}:{round(h * scale)}:flags=bicubic"
            still(stills / f"{base}.png", dst, crop=vf)
            sizes[inset] = size(dst)
        for src in sorted((CAPTURES / theme / "exports").glob("*.mp4")):
            dst = VIDEOS / f"{src.stem}-{theme}.mp4"
            clip(src, dst, IMAGES / f"{src.stem}-poster-{theme}.webp")
            sizes[src.stem] = size(dst)
    json.dump({k: {"width": w, "height": h} for k, (w, h) in sorted(sizes.items())}, sys.stdout, indent=2)
    print()


if __name__ == "__main__":
    main()
