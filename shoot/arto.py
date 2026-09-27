"""Drive Arto, macOS and CleanShot X for the site's captures.

Coordinates are global points on the main display, origin at its top left.
The main display is taken to be 1x; CleanShot's own y runs from the bottom.
"""
import json
import shutil
import subprocess
import time
from pathlib import Path

from setup import DOCS, STATE, VISITS, write_json
from datetime import datetime, timedelta

HERE = Path(__file__).resolve().parent
PREPARED = STATE.parent / "arto-backup/shoot-prepared"
SOCKET = Path("/tmp/arto-501/com.lambdalisue.arto.sock")
MEDIA = Path.home() / "Library/Application Support/CleanShot/media"
DESKTOP = Path.home() / "Desktop"
CAPTURES = DESKTOP / "Arto Site Captures"
DISPLAY_HEIGHT = 2160
TITLE_BAR = 28

# Where every main window is put: right of centre, clear of the terminal.
ORIGIN = (2700, 132)


def sh(*args: str, check: bool = True) -> str:
    return subprocess.run(args, check=check, capture_output=True, text=True).stdout.strip()


def osa(script: str) -> str:
    return sh("osascript", "-e", script)


def wait(seconds: float) -> None:
    time.sleep(seconds)


# ---- macOS ---------------------------------------------------------------


def set_dark_mode(dark: bool) -> None:
    osa(f'tell application "System Events" to tell appearance preferences to set dark mode to {str(dark).lower()}')
    wait(1.5)


# Physical key codes (ANSI positions; JIS shares them for these keys).
KEY_CODES = {
    **dict(zip("asdfhgzxcv", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])),
    **dict(zip("bqweryt", [11, 12, 13, 14, 15, 16, 17])),
    "1": 18, "2": 19, "3": 20, "4": 21, "6": 22, "5": 23, "9": 25, "7": 26,
    "-": 27, "8": 28, "0": 29, "]": 30, "o": 31, "u": 32, "[": 33, "i": 34,
    "p": 35, "l": 37, "j": 38, "k": 40, ",": 43, "/": 44, "n": 45, "m": 46,
    ".": 47, " ": 49,
}
MODS = {"command": "cmd", "shift": "shift", "control": "ctrl", "option": "alt"}


def mouse(*args) -> None:
    sh(str(HERE / "mouse"), *map(str, args))


def input_indicator(shown: bool) -> None:
    """Show or hide the input-mode badge macOS draws when a text field gets focus.

    It would otherwise sit under the caret in every shot that types. Hiding
    it writes a global default, so it is put back — as absent, the default —
    when the shoot ends.
    """
    domain, name = "kCFPreferencesAnyApplication", "TSMLanguageIndicatorEnabled"
    if shown:
        subprocess.run(["defaults", "delete", domain, name], capture_output=True)
    else:
        subprocess.run(["defaults", "write", domain, name, "-bool", "false"], check=True)
    # The agents that draw it read the default when they start, so they are
    # restarted to take it up; launchd brings them straight back.
    for agent in ["TextInputMenuAgent", "CursorUIViewService"]:
        subprocess.run(["killall", agent], capture_output=True)
    wait(2.0)


ABC = "com.apple.keylayout.ABC"


def _source(*args: str) -> str:
    return sh("osascript", "-l", "JavaScript", str(HERE / "input-source.js"), *args)


def use_plain_layout() -> tuple[str, bool]:
    """Type through plain ABC; return the source to go back to, and whether ABC was added.

    An input method draws its own mode badge under the caret whenever a field
    is focused or typed into, and no default turns that off; ABC has none.
    """
    previous = _source("current")
    added = _source("enabled", ABC) == "no"
    if added:
        _source("enable", ABC)
    _source("select", ABC)
    wait(0.5)
    return previous, added


def restore_layout(previous: str, added: bool) -> None:
    _source("select", previous)
    if not added:
        return
    # Remove ABC through the preferences it was recorded in, since the
    # input-source API will not disable a keyboard layout.
    import plistlib
    import tempfile

    with tempfile.NamedTemporaryFile(suffix=".plist", delete=False) as f:
        path = f.name
    sh("defaults", "export", "com.apple.HIToolbox", path)
    with open(path, "rb") as f:
        prefs = plistlib.load(f)
    for key_ in ("AppleEnabledInputSources", "AppleSelectedInputSources", "AppleInputSourceHistory"):
        if key_ in prefs:
            prefs[key_] = [s for s in prefs[key_] if s.get("KeyboardLayout Name") != "ABC"]
    with open(path, "wb") as f:
        plistlib.dump(prefs, f)
    sh("defaults", "import", "com.apple.HIToolbox", path)
    subprocess.run(["killall", "TextInputMenuAgent"], capture_output=True)
    Path(path).unlink()


def key(code: int, *mods: str) -> None:
    # Posted at the HID level rather than through System Events, whose
    # keystrokes CleanShot's keystroke recorder never sees.
    mouse("key", code, *(MODS[m] for m in mods))


def keystroke(ch: str, *mods: str) -> None:
    if ch.isupper():
        mods = (*mods, "shift")
    key(KEY_CODES[ch.lower()], *mods)


def type_text(text: str, per_char: float = 0.06) -> None:
    for ch in text:
        keystroke(ch)
        wait(per_char)


def point(x: int, y: int) -> None:
    """Move the pointer to (x, y) the way a hand would, from where it is."""
    mouse("to", x, y)


def click(x: int, y: int, settle: float = 0.25) -> None:
    point(x, y)
    wait(settle)
    mouse("click", x, y, 1)


def right_click(x: int, y: int, settle: float = 0.25) -> None:
    point(x, y)
    wait(settle)
    mouse("rclick", x, y)


def park_mouse() -> None:
    mouse("move", 3950, 1900)


class K:
    RETURN = 36
    ESCAPE = 53
    DOWN = 125
    UP = 126
    HOME = 115
    PAGE_DOWN = 121
    SPACE = 49


# ---- Arto ----------------------------------------------------------------


def arto_running() -> bool:
    return subprocess.run(["pgrep", "-x", "arto"], capture_output=True).returncode == 0


def quit_arto() -> None:
    if arto_running():
        osa('tell application "Arto" to quit')
    for _ in range(40):
        if not arto_running():
            return
        wait(0.25)
    raise RuntimeError("Arto did not quit")


def reset_state(open_lenses: dict[str, list[str]] | None = None, pinned: bool = False) -> None:
    """Put back the prepared state, with a history that reads as a real week."""
    quit_arto()
    shutil.rmtree(STATE)
    shutil.copytree(PREPARED, STATE)
    pins = json.loads((STATE / "pinned-searches.json").read_text())
    for pin in pins["pinnedSearches"]:
        pin["disabled"] = not pinned
    write_json(STATE / "pinned-searches.json", pins)
    today = datetime.now().astimezone().replace(second=0, microsecond=0)
    visits = []
    for days, clock, rel in VISITS:
        hour, minute = map(int, clock.split(":"))
        at = (today - timedelta(days=days)).replace(hour=hour, minute=minute)
        visits.append({"path": str(DOCS / rel), "at": at.isoformat(), "anchor": {"line": 1, "fraction": 0.0}})
    write_json(STATE / "visits.json", {"items": visits})
    lenses = {
        str(DOCS / doc): [{"id": lens, "shown": True} for lens in ids]
        for doc, ids in (open_lenses or {}).items()
    }
    (STATE / "lenses/open.json").write_text(json.dumps(lenses))


def launch_arto() -> None:
    # Straight after a quit, LaunchServices can still see the old process
    # and refuse the launch; it settles within a couple of seconds.
    for _ in range(10):
        if subprocess.run(["open", "-g", "-a", "Arto"], capture_output=True).returncode == 0:
            break
        wait(0.5)
    else:
        raise RuntimeError("Arto would not launch")
    # The socket file outlives the process that made it, so it proves
    # nothing; the welcome window appearing does.
    for _ in range(80):
        if arto_running() and windows():
            break
        wait(0.25)
    else:
        raise RuntimeError("Arto launched but opened no window")
    wait(1.0)
    close_windows()


def windows() -> list[str]:
    out = osa('tell application "System Events" to tell process "arto" to get name of every window')
    return [w for w in out.split(", ") if w]


def close_windows() -> None:
    osa(
        'tell application "System Events" to tell process "arto"\n'
        "repeat with w in (every window)\n"
        'try\nperform action "AXPress" of (first button of w whose subrole is "AXCloseButton")\nend try\n'
        "end repeat\nend tell"
    )
    wait(0.6)


def _answers() -> int:
    return sum(1 for f in (STATE / "lenses").glob("*.json") if f.name != "open.json")


def wait_for_answer(timeout: float = 120) -> None:
    """Return once a lens just opened has filed its answer.

    A lens files its answer when the run completes, so a new record is the
    moment the page stops changing; a fixed wait would either cut it short
    or leave dead air in the recording. Call it straight after opening the
    lens: a run takes seconds, so the count taken here is the one before.
    """
    before = _answers()
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if _answers() > before:
            wait(1.5)
            return
        wait(0.5)
    raise RuntimeError("the lens did not answer in time")


def activate() -> None:
    osa('tell application "Arto" to activate')
    wait(0.4)


def open_doc(
    rel: str | None,
    theme: str,
    size=(1092, 800),
    origin=ORIGIN,
    directory: str | None = None,
) -> tuple[int, int, int, int]:
    """Open one window and return its frame (x, y, w, h)."""
    x, y = origin
    w, h = size
    args = [
        "arto",
        "--open=new",
        f"--position={x},{y + TITLE_BAR}",
        f"--size={w},{h - TITLE_BAR}",
        f"--theme={theme}",
        "--wait-ready",
    ]
    if directory is not None:
        args.append(f"--directory={DOCS / directory}")
    if rel:
        args.append(str(DOCS / rel))
    subprocess.run(["timeout", "30", *args], check=True)
    activate()
    wait(0.8)
    return (x, y, w, h)


def front_window_frame(process: str = "arto") -> tuple[int, int, int, int]:
    out = osa(f'tell application "System Events" to tell process "{process}" to get {{position, size}} of window 1')
    x, y, w, h = map(int, out.split(", "))
    return (x, y, w, h)


def place_front_window(frame: tuple[int, int, int, int], process: str = "arto", name: str | None = None) -> None:
    x, y, w, h = frame
    target = f'window "{name}"' if name else "window 1"
    osa(
        f'tell application "System Events" to tell process "{process}"\n'
        f"set position of {target} to {{{x}, {y}}}\n"
        f"set size of {target} to {{{w}, {h}}}\nend tell"
    )
    wait(0.6)


# ---- CleanShot X ---------------------------------------------------------


def _cleanshot_area(frame) -> str:
    x, y, w, h = frame
    return f"x={x}&y={DISPLAY_HEIGHT - y - h}&width={w}&height={h}&display=1"


def still(frame, theme: str, name: str) -> Path:
    before = set(DESKTOP.glob("CleanShot *.png"))
    sh("open", "-g", f"cleanshot://capture-area?{_cleanshot_area(frame)}&action=save")
    for _ in range(60):
        new = set(DESKTOP.glob("CleanShot *.png")) - before
        if new:
            wait(0.5)
            src = new.pop()
            dst = CAPTURES / theme / "stills" / f"{name}.png"
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(src), dst)
            return dst
        wait(0.25)
    raise RuntimeError(f"CleanShot saved nothing for {name}")


def _projects() -> set[Path]:
    return set(MEDIA.glob("*/*.cleanshotvideo"))


def start_recording(frame) -> set[Path]:
    before = _projects()
    x, y, w, h = frame
    sh("open", "-g", f"cleanshot://record-screen?{_cleanshot_area(frame)}")
    wait(2.0)
    # The mode panel is centred on the area; Studio Mode is its last button.
    osa(f'tell application "System Events" to click at {{{x + w // 2}, {y + h // 2 + 93}}}')
    wait(3.5)  # the countdown
    return before


def stop_recording(frame, before: set[Path], theme: str, name: str) -> Path:
    x, y, w, h = frame
    # The control bar sits centred under the area; stop is its first button.
    osa(f'tell application "System Events" to click at {{{x + w // 2 - 94}, {y + h + 38}}}')
    for _ in range(120):
        new = _projects() - before
        if new:
            break
        wait(0.25)
    else:
        raise RuntimeError(f"no Studio project appeared for {name}")
    wait(3.0)
    src = new.pop()
    dst = CAPTURES / theme / "clips" / f"{name}.cleanshotvideo"
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    close_studio()
    return dst


def close_studio() -> None:
    """Close every Studio editor, discarding it: the project is kept on the Desktop.

    An editor left open covers Arto's windows, and an occluded WebView stops
    drawing, so the next --wait-ready would never be answered.
    """
    osa(
        'tell application "System Events" to tell process "CleanShot X"\n'
        "repeat with w in (every window)\n"
        'try\nperform action "AXPress" of (first button of w whose subrole is "AXCloseButton")\nend try\n'
        "delay 0.8\n"
        'try\nclick button "Close Project" of sheet 1 of w\nend try\n'
        "end repeat\nend tell"
    )
    wait(1.0)
