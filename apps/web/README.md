# aliveicon website

The documentation site and icon playground for [aliveicon](../../README.md). It is a static
Next.js app that lives next to the library and is never part of the published package.

## Run it locally

You need Node 22.18 or newer. The library itself only needs Node 18, but this app runs a few
TypeScript scripts directly.

```bash
git clone https://github.com/Hemang-patel-9/aliveicon.git
cd aliveicon
npm run dev
```

Open <http://localhost:3000>. Edit anything in `src/icons/` or `apps/web/` and reload to see it.

The first run installs the library and the website for you. Any other website command can be run
from the root too with `npm run web -- <command>`, for example `npm run web -- check`. If you
prefer to do it by hand, run `npm install` at the root, then `npm install` and `npm run dev` in
`apps/web`. Both installs are needed. In this mode the site imports the icons straight from `../../src`, and
those files use the root `node_modules`.

## Where the icons come from

The site always imports icons the way a user would, `import { Anvil } from 'aliveicon'`. Only
where that name points to changes.

| Command              | Icons come from                                     | Use it for                                     |
| -------------------- | --------------------------------------------------- | ---------------------------------------------- |
| `npm run dev`        | the library source in `src/`                        | building or tuning an icon                     |
| `npm run dev:dist`   | the exact tarball `npm pack` would publish          | checking the real package before release       |
| `npm run build:src`  | a production build from the library source          | checking a build with unreleased icons         |
| `npm run build:dist` | a production build from the packed tarball          | the build used for the public site             |
| `npm run build`      | whatever `aliveicon` is installed in `node_modules` | quick build (the published version by default) |

The badge in the footer says which one you are looking at. The `dist` commands run the root
`npm run build` first, which takes a few minutes. After a `dist` run, `apps/web/node_modules` keeps
the local tarball until you run `npm ci` again.

## Other commands

```bash
npm run check      # config, types, lint and formatting
npm test           # Playwright tests, run after a build
npm start          # serve the built site from out/ at http://localhost:3000/aliveicon/
node scripts/lighthouse.mjs http://localhost:3000/aliveicon/ mobile   # needs npm start
```

Before the first `npm test`, install the test browser once with `npx playwright install chromium`.
The tests run against the last build in `out/`, so run `npm run build` (or `build:src`) first.

## Changing how it looks

Every visual and behavioral value lives in [site.config.ts](site.config.ts): colors for both
themes, fonts, type scale, spacing, radii, layout sizes, motion, the default and limits of every
gallery setting, the navigation and the footer. It is validated when you build (contrast, ranges,
defaults), so a bad value fails with a clear message instead of shipping.

Visitors can change the gallery settings in the sidebar. Those are saved in their browser and can
be shared with the "Copy link" button.

## Layout

```
site.config.ts        every configurable value
app/                  pages and global styles
components/           gallery, settings panel, header and footer
lib/                  config types, settings store, search, theme
scripts/              metadata generator, dist mode, static server, Lighthouse
tests/                unit and end-to-end tests
```

`lib/generated/` is created by `scripts/generate-meta.mjs` on every run and is not committed.

## Publishing

The site is built from the packed package (`npm run build:dist`) and is meant to be deployed only
when a release tag is pushed, so it always matches what is on npm. A deploy workflow has not been
added yet.
