# Rendering

What the engine does with a document, and what that looks like on the page.

## Math

KaTeX typesets formulas where they stand. Inline, $e^{i\pi} + 1 = 0$ sits in
the line without disturbing it; displayed, it gets the room it needs:

$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x)\, e^{-2\pi i x \xi}\, dx
$$

The Gaussian integral, for the pleasure of it:

$$
\int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}
$$

And a matrix, because alignment is where typesetting earns its keep:

$$
A = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$

## Code

Syntax highlighting comes from the engine, and every block carries a copy
button in its corner.

```rust
impl Renderer {
    /// Lay out only what the reader can see, plus a screen either side.
    fn visible_range(&self, viewport: Rect) -> Range<usize> {
        let first = self.blocks.partition_point(|b| b.bottom < viewport.top);
        let last = self.blocks.partition_point(|b| b.top < viewport.bottom);
        first.saturating_sub(OVERSCAN)..(last + OVERSCAN).min(self.blocks.len())
    }
}
```

```python
def fibonacci(n: int) -> int:
    """The nth Fibonacci number, bottom up."""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

```sh
arto page --theme dark README.md > README.html
```

## Alerts

GitHub's five alert kinds, each with its own colour and glyph.

> [!NOTE]
> Useful information that a reader should notice even when skimming.

> [!TIP]
> An optional nicety that makes something easier.

> [!IMPORTANT]
> Knowledge required for a reader to get the result they came for.

> [!WARNING]
> Urgent information needing immediate attention, to avoid a problem.

> [!CAUTION]
> Advice about the risks or negative outcomes of an action.

## Tables

| Construct | Where it comes from | Rendered by |
| --- | --- | --- |
| Headings, lists, emphasis | CommonMark | the engine |
| Tables, task lists, strikethrough | GitHub Flavored Markdown | the engine |
| Alerts | GitHub | the engine |
| Math | KaTeX syntax | KaTeX, in the page |
| Diagrams | Mermaid syntax | Mermaid, in the page |

## Task lists

- [x] Render GitHub's dialect
- [x] Draw diagrams and formulas offline
- [ ] Read everything ever written

## Footnotes

A footnote stays out of the way of the sentence it qualifies.[^1] Resting on
the reference shows it without leaving your place.

[^1]: Like this one, which a reader can ignore until they want it.
