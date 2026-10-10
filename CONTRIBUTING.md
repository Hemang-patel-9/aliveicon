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

1. Pick the icon. Most come from [lucide.dev](https://lucide.dev/icons): use its exact name, e.g.
   `BookmarkCheck`. For an icon that Lucide doesn't have, see the section below. Check the name isn't
   already in `src/index.ts`.
2. Create `src/icons/<first letter>/<Name>.tsx`, e.g. `src/icons/b/BookmarkCheck.tsx`.
3. Copy an existing icon with a similar animation (for example `src/icons/a/AlignCenterHorizontal.tsx`)
   and replace the paths with the ones from the SVG. Keep the 24×24 viewBox, and for a Lucide icon
   don't change the geometry.
4. Wire the triggers with `useAnimatedIcon(ref, props)` from `src/lib/use-animated-icon.ts`.
   Don't write your own hover/click handlers.
5. Run `npm run generate` to add it to `src/index.ts`.

### Icons that Lucide doesn't have

You can add your own icons too. They need to:

- be your own drawing, or come from a source whose license allows redistribution under the MIT
  License. Say where it comes from in the pull request.
- match the style of the rest: 24×24 viewBox, 2px stroke, round caps and joins, `currentColor`.
- have a PascalCase name, in the folder of its first letter.

If the shape comes from somewhere else, add its source and license text to
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Brand and logo icons depict trademarks, so open an
issue first and we'll agree on it before you spend time on the animation.

A few rules the lint checks for you:

- the file starts with `'use client';`
- the `<svg>` has `aria-hidden="true"` and `stroke="currentColor"`
- the component sets `displayName`
- no `console.log` and no local `cn` helper

## Seeing your icon in a browser

`npm test` only checks that icons render, so look at yours on the website in `apps/web`. It loads the
icons straight from `src/`, so your new icon shows up in the gallery.

```bash
npm run dev          # from the repository root, http://localhost:3000
```

The first run installs the website's dependencies for you. Search for your icon, hover it, and try the animation triggers in the sidebar. Full details, including
how to test the packed package instead of the source, are in [apps/web/README.md](apps/web/README.md).
The website needs Node 22.18 or newer.

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
