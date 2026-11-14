# aliveicon website

The documentation site and icon playground for [aliveicon](../../README.md). It is a static
Next.js app that lives next to the library and is never part of the published package.

## Run it locally

You need Node 22.18 or newer. This app runs a few TypeScript scripts directly.

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
npm start          # serve the built site from out/ at http://localhost:3000/
node scripts/lighthouse.mjs http://localhost:3000/ mobile   # needs npm start
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
scripts/              metadata generator, dist mode, static server, Lighthouse, smoke test
tests/                unit and end-to-end tests
```

`lib/generated/` is created by `scripts/generate-meta.mjs` on every run and is not committed.

## Publishing

The site is built from the packed package (`npm run build:dist`) and deployed only when a release
tag is pushed, so it always matches what is on npm. It is hosted on Cloudflare as a Worker with
static assets: [wrangler.jsonc](wrangler.jsonc) serves `out/`, and [public/\_headers](public/_headers)
adds the security and cache headers.

[.github/workflows/deploy-site.yml](../../.github/workflows/deploy-site.yml) runs on `v*` tags and
does nothing until these are set in the repository settings:

| Where                        | Name                    | Value                                       |
| ---------------------------- | ----------------------- | ------------------------------------------- |
| Actions variables            | `SITE_URL`              | `https://aliveicon.dev` (no trailing slash) |
| Environment `site` → secrets | `CLOUDFLARE_API_TOKEN`  | A custom API token, see below               |
| Environment `site` → secrets | `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID                   |

The `site` environment only accepts `v*` tags and needs a maintainer's approval before each deploy.
Give the API token only what a deploy uses: Account → Workers Scripts → Edit, plus Zone → Workers
Routes → Edit and Zone → Zone → Read, with the zone resource limited to `aliveicon.dev`.

The site lives at [aliveicon.dev](https://aliveicon.dev), served from the root of the domain.
`aliveicon.dev` has to be a zone in the same Cloudflare account, and the API token's zone
resources must include it. `routes` in [wrangler.jsonc](wrangler.jsonc) then attaches the domain to
the `aliveicon` Worker on every deploy and creates its DNS record. Locally, `SITE_URL` and
`SITE_BASE_PATH` override [site.config.ts](site.config.ts) for `npm run build` and `npm start`.

### Checking the live site

After every deploy the workflow runs `node scripts/smoke.mjs "$SITE_URL"`. It checks the home page,
the security and cache headers, `robots.txt`, `sitemap.xml`, `security.txt`, the icons, that unknown
pages return 404 and that `http://` redirects, and fails the run if anything is off. It retries a few
times first, so a deploy that is still spreading does not fail it.
[.github/workflows/site-health.yml](../../.github/workflows/site-health.yml) runs the same check every
six hours, so a broken site shows up as a failed run and an email from GitHub. Run it by hand with:

```bash
node scripts/smoke.mjs https://aliveicon.dev
```

GitHub turns off scheduled workflows in a repository with no activity for 60 days. If that happens,
re-enable "Site health" from the Actions tab.

### Rolling back

Every deploy is kept as a Worker version, so a bad release can be undone in seconds without a new
build. In the Cloudflare dashboard open Workers & Pages → `aliveicon` → Deployments and roll back to
the previous one, or from `apps/web`:

```bash
npx wrangler deployments list
npx wrangler rollback            # back to the previous version
npx wrangler rollback <version>  # or to a specific one
```

Then run the smoke test above. A rollback lasts until the next deploy, so fix the problem and tag a
new release.
