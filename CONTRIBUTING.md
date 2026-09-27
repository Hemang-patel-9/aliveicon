# Contributing to aliveicon

Thanks for helping out! Bug fixes, new icons and better animations are all welcome.

## Setup

You need Node 18 or newer.

```bash
git clone https://github.com/Hemang-patel-9/aliveicon.git
cd aliveicon
npm install
```

## Adding an icon

1. Pick the icon on [lucide.dev](https://lucide.dev/icons) and use its exact name, e.g. `BookmarkCheck`.
   Check it isn't already in `src/index.ts`.
2. Create `src/icons/<first letter>/<Name>.tsx`, e.g. `src/icons/b/BookmarkCheck.tsx`.
3. Copy an existing icon with a similar animation (for example `src/icons/a/AlignCenterHorizontal.tsx`)
   and replace the paths with the ones from Lucide's SVG. Keep the 24×24 viewBox and don't change the geometry.
4. Wire the triggers with `useAnimatedIcon(ref, props)` from `src/lib/use-animated-icon.ts`.
   Don't write your own hover/click handlers.
5. Run `npm run generate` to add it to `src/index.ts`.

A few rules the lint checks for you:

- the file starts with `'use client';`
- the `<svg>` has `aria-hidden="true"` and `stroke="currentColor"`
- the component sets `displayName`
- no `console.log` and no local `cn` helper

## Before opening a PR

```bash
npm run format
npm run check        # index, icon lint, formatting, type-check
npm run build
npm test             # renders every icon from the built package
```

Also update the icon count and table in `README.md` if you added icons, and add a line to
`CHANGELOG.md` under `Unreleased`.

`npm test` only checks that icons render, so please try your change in a real app too
(hover, `loopOnHover`, `animateOnClick`, `autoAnimateOnLoad` and a `ref`).

## Reporting bugs and requesting icons

Use the issue templates. For security problems see [SECURITY.md](SECURITY.md).

By contributing you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md) and that your work is
released under the [MIT License](LICENSE).
