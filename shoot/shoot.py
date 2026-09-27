#!/usr/bin/env python3
"""Photograph and record every figure the site shows, in one theme.

    python3 shoot.py light all
    python3 shoot.py dark gfm palette

Run setup.py first, and keep hands off the machine while this runs: it types,
clicks and moves the pointer.
"""
import sys
from typing import Callable

from arto import (
    K,
    click,
    input_indicator,
    restore_layout,
    use_plain_layout,
    place_front_window,
    point,
    right_click,
    wait_for_answer,
    activate,
    close_windows,
    key,
    keystroke,
    launch_arto,
    mouse,
    open_doc,
    park_mouse,
    reset_state,
    set_dark_mode,
    start_recording,
    still,
    stop_recording,
    type_text,
    wait,
)

SCENES: dict[str, Callable[[str], None]] = {}
# What each scene needs of the state before Arto starts.
LENS_STATE: dict[str, dict[str, list[str]]] = {}
PINNED: set[str] = set()


def scene(name: str, lenses: dict[str, list[str]] | None = None, pinned: bool = False):
    def register(fn):
        SCENES[name] = fn
        if lenses:
            LENS_STATE[name] = lenses
        if pinned:
            PINNED.add(name)
        return fn

    return register


def jump_to_heading(index: int) -> None:
    """Walk the contents list to the index-th heading and go there."""
    keystroke("j", "command")
    wait(0.6)
    key(K.HOME)
    # Home leaves the list with nothing selected; the first Down selects the
    # first heading.
    for _ in range(index + 1):
        key(K.DOWN)
        wait(0.08)
    key(K.RETURN)
    wait(0.8)


# ---- Reading -------------------------------------------------------------


@scene("welcome")
def welcome(theme: str) -> None:
    frame = open_doc(None, theme)
    park_mouse()
    still(frame, theme, "welcome")


@scene("gfm")
def gfm(theme: str) -> None:
    frame = open_doc("Arto/docs/markdown.md", theme)
    park_mouse()
    still(frame, theme, "gfm")


@scene("pinned", pinned=True)
def pinned(theme: str) -> None:
    frame = open_doc("Arto/docs/rendering.md", theme)
    park_mouse()
    still(frame, theme, "pinned")


@scene("rendering")
def rendering(theme: str) -> None:
    frame = open_doc("Arto/docs/rendering.md", theme)
    park_mouse()
    still(frame, theme, "rendering")


@scene("code")
def code(theme: str) -> None:
    frame = open_doc("Arto/docs/rendering.md", theme)
    jump_to_heading(2)
    park_mouse()
    still(frame, theme, "code")


@scene("alerts")
def alerts(theme: str) -> None:
    frame = open_doc("Arto/docs/rendering.md", theme)
    jump_to_heading(3)
    park_mouse()
    still(frame, theme, "alerts")


@scene("frontmatter")
def frontmatter(theme: str) -> None:
    frame = open_doc("Arto/docs/architecture.md", theme)
    x, y, _, _ = frame
    mouse("click", x + 120, y + 112)  # the collapsed FRONTMATTER bar
    wait(0.6)
    park_mouse()
    still(frame, theme, "frontmatter")


@scene("diagrams")
def diagrams(theme: str) -> None:
    frame = open_doc("Arto/docs/diagrams.md", theme)
    wait(1.5)
    park_mouse()
    still(frame, theme, "diagrams")


# ---- Getting around ------------------------------------------------------


@scene("contents")
def contents(theme: str) -> None:
    frame = open_doc("Arto/docs/rendering.md", theme)
    keystroke("j", "command")
    wait(0.6)
    key(K.DOWN)
    wait(0.3)
    park_mouse()
    still(frame, theme, "contents")
    key(K.ESCAPE)


@scene("panels")
def panels(theme: str) -> None:
    frame = open_doc("Arto/docs/architecture.md", theme, directory="Arto")
    park_mouse()
    for face, name in [("1", "panel-places"), ("2", "panel-recent")]:
        keystroke(face, "command")
        wait(0.8)
        still(frame, theme, name)
    key(K.ESCAPE)


@scene("links")
def links(theme: str) -> None:
    # Links searches the deepest root holding the document, so the root is
    # put above every folder that links to it.
    frame = open_doc("Arto/docs/architecture.md", theme, directory="")
    park_mouse()
    keystroke("4", "command")
    wait(1.5)
    still(frame, theme, "panel-links")
    key(K.ESCAPE)


# ---- Finding -------------------------------------------------------------


@scene("find")
def find(theme: str) -> None:
    frame = open_doc("Arto/docs/architecture.md", theme)
    keystroke("f", "command")
    wait(0.5)
    type_text("crate")
    wait(1.5)
    park_mouse()
    still(frame, theme, "find")
    key(K.ESCAPE)


@scene("palette")
def palette(theme: str) -> None:
    frame = open_doc("Arto/docs/architecture.md", theme)
    keystroke("k", "command")
    wait(0.6)
    type_text("ren")
    wait(1.5)
    park_mouse()
    still(frame, theme, "palette")
    key(K.ESCAPE)


# ---- Windows -------------------------------------------------------------


@scene("windows")
def window_stack(theme: str) -> None:
    for name, rel in [
        ("window-a", "Notes/typography.md"),
        ("window-b", "rfcs/0001-document-windows.md"),
        ("window-c", "Arto/docs/architecture.md"),
    ]:
        frame = open_doc(rel, theme, size=(1072, 740))
        park_mouse()
        still(frame, theme, name)
        close_windows()


VIEWER = (2700, 132, 792, 620)


def viewer_shot(theme: str, rel: str, at: tuple[int, int], name: str) -> None:
    frame = open_doc(rel, theme)
    x, y, _, _ = frame
    wait(1.0)
    mouse("click", x + at[0], y + at[1])
    wait(0.5)
    key(K.RETURN)
    wait(1.5)
    place_front_window(VIEWER)
    wait(1.0)
    park_mouse()
    still(VIEWER, theme, name)


@scene("diagram-viewer")
def diagram_viewer(theme: str) -> None:
    viewer_shot(theme, "Arto/docs/diagrams.md", (500, 460), "diagram-viewer")


@scene("image-viewer")
def image_viewer(theme: str) -> None:
    viewer_shot(theme, "Arto/docs/images.md", (500, 380), "image-viewer")


# ---- Fitting in ----------------------------------------------------------

PREFERENCES = (2700, 132, 872, 660)
PANES = {"appearance": 69, "markdown": 105, "reading": 141, "keybindings": 285, "lenses": 321}


@scene("preferences")
def preferences(theme: str) -> None:
    open_doc("Arto/README.md", theme)
    keystroke(",", "command")
    wait(1.5)
    place_front_window(PREFERENCES, name="Preferences")
    x, y, _, _ = PREFERENCES
    for pane, name, scroll in [
        ("appearance", "preferences", 0),
        ("markdown", "preferences-markdown", 0),
        ("keybindings", "preferences-keys", 0),
        ("lenses", "preferences-lenses", 0),
        ("reading", "preferences-reading", 800),
    ]:
        mouse("click", x + 80, y + PANES[pane])
        wait(1.0)
        if scroll:
            mouse("scroll", x + 500, y + 360, scroll)
            wait(0.8)
        park_mouse()
        still(PREFERENCES, theme, name)


# ---- Reading closely -----------------------------------------------------


@scene("changes")
def changes(theme: str) -> None:
    frame = open_doc("rfcs/0002-reading-closely.md", theme)
    wait(1.5)
    park_mouse()
    still(frame, theme, "changes")
    keystroke("j", "command")
    wait(0.8)
    still(frame, theme, "changes-contents")
    key(K.ESCAPE)


@scene("highlights")
def highlights(theme: str) -> None:
    frame = open_doc("Notes/reading-well.md", theme)
    x, y, _, _ = frame
    wait(1.0)
    # Rest on the dot that ends the highlight carrying a note: the note shows
    # without the card, whose text field would draw the input-mode indicator.
    mouse("glide", x + 600, y + 700, x + 415, y + 494, 30)
    wait(1.5)
    still(frame, theme, "highlights")


@scene("reading-time")
def reading_time(theme: str) -> None:
    frame = open_doc("Notes/reading-well.md", theme)
    x, y, _, _ = frame
    mouse("scroll", x + 500, y + 400, 900)
    wait(1.0)
    park_mouse()
    still(frame, theme, "reading-time")


@scene("link-preview")
def link_preview(theme: str) -> None:
    frame = open_doc("Notes/reading-list.md", theme)
    x, y, _, _ = frame
    wait(1.0)
    mouse("glide", x + 600, y + 700, x + 138, y + 220, 30)  # "Architecture"
    wait(2.0)
    still(frame, theme, "link-preview")


@scene("sticky-table")
def sticky_table(theme: str) -> None:
    frame = open_doc("Arto/docs/keybindings.md", theme)
    x, y, _, _ = frame
    mouse("scroll", x + 500, y + 400, 520)
    wait(1.0)
    park_mouse()
    still(frame, theme, "sticky-table")


# ---- Lenses --------------------------------------------------------------

ESSAY = "Notes/reading-well.md"


@scene("lens-page", lenses={ESSAY: ["translate"]})
def lens_page(theme: str) -> None:
    frame = open_doc(ESSAY, theme)
    wait(1.5)
    park_mouse()
    still(frame, theme, "lens-page")


# The essay has too few terms for the terms lens to mark much.
SPEC = "Arto/docs/architecture.md"


@scene("lens-annotate", lenses={SPEC: ["explain-terms"]})
def lens_annotate(theme: str) -> None:
    frame = open_doc(SPEC, theme)
    x, y, _, _ = frame
    wait(1.5)
    mouse("glide", x + 600, y + 700, x + 49, y + 233, 30)  # the lead paragraph's mark
    wait(1.5)
    still(frame, theme, "lens-annotate")


@scene("lens-summary", lenses={ESSAY: ["summarize"]})
def lens_summary(theme: str) -> None:
    frame = open_doc(ESSAY, theme)
    x, y, w, _ = frame
    wait(1.5)
    mouse("click", x + w - 187, y + 53)  # the summary's glyph in the header
    wait(1.2)
    park_mouse()
    still(frame, theme, "lens-summary")


# ---- Clips ---------------------------------------------------------------
# Recorded in CleanShot's Studio Mode, so each leaves a project on the
# Desktop that can still take a zoom or a background before it is exported.
# What a reader would do with the pointer is done with the pointer; the keys
# pressed are recorded by CleanShot and shown in the clip.

CLIP = (900, 594)

# Window-relative positions of the chrome, for a window of width w.
RAIL = {"places": 53, "starred": 85, "recent": 117, "links": 149}


def rail(frame, face: str) -> None:
    x, y, _, _ = frame
    click(x + 19, y + RAIL[face])


def header_button(frame, from_right: int) -> tuple[int, int]:
    x, y, w, _ = frame
    return (x + w - from_right, y + 53)


FOCUS_BUTTON = 73
THEME_BUTTON = 35


def ruler(frame) -> tuple[int, int]:
    x, y, w, h = frame
    return (x + w - 30, y + round(h * 0.53))


def record(frame, theme: str, name: str, actions: Callable[[], None]) -> None:
    x, y, w, h = frame
    # Start the pointer inside the frame, in the page's right margin, so it
    # enters no shot from outside and rests on nothing that reacts to it.
    mouse("move", x + w - 100, y + h - 60)
    before = start_recording(frame)
    wait(0.6)
    actions()
    wait(1.2)
    stop_recording(frame, before, theme, name)


def slow_type(text: str) -> None:
    type_text(text, per_char=0.16)


@scene("motion-panel")
def motion_panel(theme: str) -> None:
    frame = open_doc("Arto/docs/architecture.md", theme, size=CLIP, directory="Arto")
    x, y, w, h = frame

    def act() -> None:
        for face in ["places", "recent", "starred", "links"]:
            rail(frame, face)
            wait(1.6)
        point(x + w // 2, y + h // 2)
        wait(1.0)

    record(frame, theme, "motion-panel", act)


@scene("motion-contents")
def motion_contents(theme: str) -> None:
    frame = open_doc("Arto/docs/rendering.md", theme, size=CLIP)
    x, y, w, h = frame

    def act() -> None:
        point(*ruler(frame))
        wait(1.4)
        click(x + 660, y + 381)  # "Code" in the list that opens
        wait(0.6)
        point(x + 300, y + 400)
        wait(1.2)

    record(frame, theme, "motion-contents", act)


@scene("motion-palette")
def motion_palette(theme: str) -> None:
    frame = open_doc("Arto/docs/architecture.md", theme, size=CLIP)
    x, y, w, h = frame

    def act() -> None:
        keystroke("k", "command")
        wait(0.8)
        slow_type("ren")
        wait(1.0)
        click(x + 330, y + 310)  # "docs/rendering.md" under Recent
        wait(1.8)

    record(frame, theme, "motion-palette", act)


@scene("motion-diagram")
def motion_diagram(theme: str) -> None:
    frame = open_doc("Arto/docs/diagrams.md", theme, size=(900, 660))
    x, y, _, _ = frame

    def act() -> None:
        click(x + 400, y + 420)
        wait(0.3)
        # The viewer opens at a spot of its own, off to the left.
        place_front_window((x + 70, y + 40, 760, 580), name="Mermaid Viewer")
        wait(1.2)
        point(x + 450, y + 330)
        mouse("scroll", x + 450, y + 330, -40)
        wait(1.5)

    record(frame, theme, "motion-diagram", act)


@scene("motion-theme")
def motion_theme(theme: str) -> None:
    frame = open_doc("Arto/docs/architecture.md", theme, size=CLIP)
    toggle = header_button(frame, THEME_BUTTON)

    def pick() -> None:
        click(*toggle)
        wait(0.6)
        click(toggle[0], toggle[1] + 40)  # the other of light and dark
        wait(1.8)

    def act() -> None:
        pick()
        pick()

    record(frame, theme, "motion-theme", act)


@scene("motion-focus")
def motion_focus(theme: str) -> None:
    frame = open_doc("Notes/reading-well.md", theme, size=CLIP)
    x, y, w, h = frame

    def act() -> None:
        click(*header_button(frame, FOCUS_BUTTON))
        wait(1.5)
        point(x + w // 2, y + h - 60)
        for _ in range(4):
            key(K.DOWN)
            wait(1.0)
        click(x + w // 2, y + h // 2)  # a click on the page leaves
        wait(1.4)

    record(frame, theme, "motion-focus", act)


def lens_on_document(frame, at: tuple[int, int], item: int) -> None:
    """Open a lens from the context menu: right-click, Lens on Document, item."""
    x, y, _, _ = frame
    cx, cy = x + at[0], y + at[1]
    right_click(cx, cy)
    wait(0.8)
    lens_row = cy + 313  # Lens on Document, with nothing selected
    point(cx + 70, cy + 10)
    point(cx + 70, lens_row)
    wait(0.8)
    point(cx + 300, lens_row)
    wait(0.4)
    click(cx + 300, lens_row + item)
    wait(0.5)


# Rows of the Lens on Document submenu, below the row that opened it.
TRANSLATE = 6
SUMMARIZE = 77


@scene("motion-lens")
def motion_lens(theme: str) -> None:
    # RFC 0001 has never been translated in the prepared state, so the lens
    # answers live, block by block from the top.
    frame = open_doc("rfcs/0001-document-windows.md", theme, size=(900, 700))

    def act() -> None:
        lens_on_document(frame, (220, 150), TRANSLATE)
        wait_for_answer()

    record(frame, theme, "motion-lens", act)


# ---- Demos ---------------------------------------------------------------
# The walkthroughs on the home page, each ending up with a background.

DEMO = (1092, 800)


@scene("demo-reading")
def demo_reading(theme: str) -> None:
    frame = open_doc(None, theme, size=DEMO)
    x, y, w, h = frame

    def act() -> None:
        wait(1.2)
        keystroke("k", "command")
        wait(0.8)
        slow_type("arch")
        wait(1.0)
        key(K.RETURN)
        wait(2.0)
        for face in ["places", "recent", "starred"]:
            rail(frame, face)
            wait(1.6)
        point(x + w // 2, y + h // 2)
        wait(0.8)
        point(*ruler(frame))
        wait(1.4)
        click(x + 851, y + 499)  # "Crates" in the contents list
        wait(0.6)
        point(x + 400, y + 600)
        wait(1.6)

    record(frame, theme, "demo-reading", act)


@scene("demo-closely")
def demo_closely(theme: str) -> None:
    frame = open_doc("rfcs/0002-reading-closely.md", theme, size=DEMO)
    x, y, w, h = frame

    def act() -> None:
        wait(1.8)
        for _ in range(2):
            key(30, "control")  # ⌃] — the next change
            wait(1.4)
        point(*ruler(frame))
        wait(2.0)
        point(x + w // 2, y + h // 2)
        wait(0.6)
        keystroke("k", "command")
        wait(0.6)
        slow_type("reading-l")
        wait(0.6)
        key(K.RETURN)
        wait(1.5)
        point(x + 138, y + 220)  # rest on "Architecture"
        wait(2.5)
        point(x + 700, y + 650)
        wait(0.6)
        keystroke("k", "command")
        wait(0.6)
        slow_type("reading-w")
        wait(0.6)
        key(K.RETURN)
        wait(1.5)
        # The opening sentence, near the top, so the menus open downwards.
        point(x + 65, y + 180)
        mouse("drag", x + 65, y + 180, x + 447, y + 180)
        wait(0.4)
        right_click(x + 200, y + 180)
        wait(0.8)
        point(x + 270, y + 180 + 167)  # Highlight
        wait(0.8)
        point(x + 470, y + 180 + 172)
        click(x + 470, y + 180 + 236)  # Pink
        wait(1.0)
        point(x + 415, y + 494)  # rest on the note's dot
        wait(2.2)
        click(*header_button(frame, FOCUS_BUTTON))
        wait(1.5)
        point(x + w // 2, y + h - 60)
        for _ in range(3):
            key(K.DOWN)
            wait(1.0)
        click(x + w // 2, y + h // 2)
        wait(1.2)

    record(frame, theme, "demo-closely", act)


@scene("demo-lenses")
def demo_lenses(theme: str) -> None:
    frame = open_doc("rfcs/0001-document-windows.md", theme, size=DEMO)
    x, y, w, h = frame

    def act() -> None:
        wait(1.2)
        lens_on_document(frame, (300, 200), TRANSLATE)
        wait_for_answer()
        wait(1.5)
        lens_on_document(frame, (300, 200), SUMMARIZE)
        wait_for_answer()
        click(*header_button(frame, 187))  # the summary's glyph
        wait(3.0)
        click(x + w // 2, y + h - 80)

    record(frame, theme, "demo-lenses", act)


def run(theme: str, names: list[str]) -> None:
    if names == ["all"]:
        names = list(SCENES)
    unknown = [n for n in names if n not in SCENES]
    if unknown:
        sys.exit(f"unknown scenes: {', '.join(unknown)}")
    set_dark_mode(theme == "dark")
    input_indicator(False)
    layout = use_plain_layout()
    try:
        for name in names:
            print(f"[{theme}] {name}", flush=True)
            reset_state(LENS_STATE.get(name), pinned=name in PINNED)
            launch_arto()
            activate()
            SCENES[name](theme)
            close_windows()
    finally:
        restore_layout(*layout)
        input_indicator(True)


if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2:])
