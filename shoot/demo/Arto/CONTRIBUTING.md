# Contributing

Thank you for wanting to make Arto better.

## Before you start

Open an issue first for anything larger than a typo, so the change can be
discussed before it is written. Read [the architecture](docs/architecture.md)
to find which crate a change belongs in.

## Making a change

1. Fork the repository and create a branch.
2. Write a test that fails without your change.
3. Make it pass, then run the whole suite.
4. Open a pull request that says why, not only what.

> [!TIP]
> `just check` runs the formatter, the linters and every test in one go.

## Style

Code says how, tests say what, and commit messages say why. A comment is for
the one thing none of those can hold: why the obvious alternative was not
taken.
