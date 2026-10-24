# AGENTS.md

Guidance for AI coding agents working in this repository. Humans should read
[CONTRIBUTING.md](CONTRIBUTING.md); the rules below are the same ones, written to be checked mechanically.

## What this is

`aliveicon` is an npm package of animated React icons. Shapes come from [Lucide](https://lucide.dev)
(ISC, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)). Each icon adds a Framer Motion animation that
plays on hover, click, mount, loop, or through a ref.

## Layout

| Path                            | Purpose                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `src/icons/<letter>/<Name>.tsx` | One icon per file. File name is the export name; folder is its lowercase first letter.  |
| `src/lib/use-animated-icon.ts`  | Shared trigger hook: hover, loopOnHover, animateOnClick, autoAnimateOnLoad, ref handle. |
| `src/lib/types.ts`              | Public types: `AnimatedIconProps`, `AnimatedIconHandle`, `AnimatedIconTriggers`.        |
| `src/lib/cn.ts`                 | `clsx` + `tailwind-merge`. Icons import it; they never define their own.                |
| `src/aliases.ts`                | Deprecated misspelled names, kept for compatibility until 2.0.0.                        |
| `src/index.ts`                  | **Generated.** Never edit by hand; run `npm run generate`.                              |
| `scripts/`                      | Index generator, icon linter, smoke test.                                               |
| `apps/web`                      | Documentation site.                                                                     |

## Commands

```sh
npm run generate   # rebuild src/index.ts from the files on disk
npm run check      # index is current + lint:icons + Prettier + tsc --noEmit
npm run build      # Rollup, one module per icon into dist/esm, dist/cjs, dist/types (slow, ~3 min)
npm test           # server-renders every export from both builds; needs a fresh build
npm run format     # Prettier: tabs, single quotes, semicolons, width 100
```

Run `npm run check` before you finish any change. Run `npm run build && npm test` when you touch
`rollup.config.js`, `package.json`, the hook, or anything exported.

## Icon conventions

`scripts/lint-icons.mjs` enforces these. A change that fails `npm run check` is not done.

- First line is `'use client';`. Imports come only from `framer-motion`, `react` and `../../lib/*`.
- Use `forwardRef<AnimatedIconHandle, AnimatedIconProps>` and `useAnimatedIcon(ref, props, options?)`.
  Spread `iconProps` onto the wrapper `<div>` and pass `controls` to every `motion.*` element.
- The `<svg>` has `aria-hidden="true"`, `viewBox="0 0 24 24"`, `stroke="currentColor"`, `strokeWidth="2"`
  and round caps and joins. `XTwitter` is the only `viewBox` exception.
- Variants are named `normal` (rest) and `animate`. Any other rest name needs `{ rest: '<name>' }`.
- An `animate` variant with `repeat: Infinity` needs `{ cycleMs }` so a single play ends.
- Set `<Name>.displayName = '<Name>'`. No `console.*`.
- No code comments. The only exception is `@deprecated` in `src/aliases.ts`.
- 65 older icons still own their trigger logic and are listed in `legacyIcons` in
  `scripts/lint-icons.mjs`. Do not add new icons to that list.

New icon checklist: add the file, run `npm run generate`, then `npm run check`.

## Behavior to preserve

- When a `ref` is attached, hover is ignored because the parent is in charge. Click and mount triggers
  still work.
- Rollup strips `'use client'`; `rollup.config.js` restores it with `banner`. `npm test` verifies every
  emitted file starts with it.
- Keep the explicit `include` in `rollup.config.js`. The rpt2 default no longer matches under
  picomatch >= 2.3.2 and the build would silently skip TypeScript.
- `dist/esm/package.json` (`"type": "module"`) is emitted by the build so Node loads ESM files as ESM.
- Most wrappers get `display` from the Tailwind class `inline-block`, which does nothing without Tailwind.
  Moving it to an inline style is a visible layout change that has not been decided. Do not change it.

## Ask first

Stop and ask the maintainer before you:

- change the shared hook's behavior or the public props and types;
- add a new prop or trigger, or add `prefers-reduced-motion` handling;
- add brand or trademarked icons;
- change the wrapper element or its display;
- add a runtime dependency (the package ships with only `clsx` and `tailwind-merge`);
- touch `.github/workflows/`, release scripts, or `package.json` version, `files` or `exports`.

## Style

- Match the surrounding code: naming, density, idiom. Code should read as hand-written.
- Prettier is the formatter. Do not hand-format or reformat unrelated files.
- Checkouts on Windows use CRLF and the repo stores LF. Ignore line-ending warnings.

## Code Review Rules

Automated reviewers (Codex, Claude, Copilot) and human reviewers use these rules. Each rule has a
priority; report a broken rule at that priority.

### How to review

- CI already runs `npm run check`, `npm run build`, `npm test` and `npm pack --dry-run`. Don't report what
  those catch (Prettier formatting, a stale `src/index.ts`, `lint-icons` failures) unless the PR changes or
  skips them.
- Ignore CRLF/LF differences, `dist/`, lockfile churn that matches a `package.json` change, and style
  preferences.
- Name the file and line and the rule that was broken. Explain the impact in one or two sentences.

### Security (P0)

Treat each of these as P0:

- Added or changed npm scripts in `package.json`, especially `preinstall`, `install`, `postinstall`,
  `prepare` and `prepublishOnly`.
- Changes under `.github/workflows/` that widen `permissions`, add `id-token`, use `pull_request_target`,
  read secrets, add third-party actions not pinned to a commit SHA, or publish outside the staged
  `npm stage publish` flow.
- Code in `src/`, `scripts/` or `rollup.config.js` that makes network requests, downloads or runs remote
  code, or uses `eval` or `new Function`.
- `dangerouslySetInnerHTML`, `innerHTML`, or props flowing into `href`, `xlinkHref`, `<script>` or
  `<foreignObject>`.
- Committed secrets, tokens, `.npmrc` credentials or `.env` files.
- A new entry in `dependencies`, or a `package-lock.json` change with no matching `package.json` change.

### Package integrity (P0)

Treat each of these as P0:

- The `'use client'` `banner` removed from `rollup.config.js`, or its explicit rpt2 `include` dropped.
- Changes to `exports`, `main`, `module`, `types`, `files` or `sideEffects` in `package.json`.
- A public export removed or renamed, including the deprecated names in `src/aliases.ts` before 2.0.0.

### Project rules (P1)

Treat each of these as P1:

- `src/index.ts` edited by hand instead of regenerated with `npm run generate`.
- A new entry in `legacyIcons` in `scripts/lint-icons.mjs`.
- A new icon that doesn't use `useAnimatedIcon`, isn't named with Lucide's exact PascalCase name, or whose
  paths don't match Lucide's SVG.
- An `animate` variant with `repeat: Infinity` and no `{ cycleMs }`.
- A change to the shared hook, `src/lib/types.ts`, props, triggers, the wrapper element, its `inline-block`
  display, or reduced-motion handling, without a linked issue where the maintainer agreed to it.
- Brand or trademarked icons.
- Code comments (other than `@deprecated` in `src/aliases.ts`) or `console.*` calls.
- A user-facing change with no line under `Unreleased` in `CHANGELOG.md`, or new icons without an updated
  README icon count and table.

## Boundaries

- Do not edit `dist/`, `node_modules/` or `src/index.ts`.
- Never commit secrets, tokens or `.env` files. Do not add network calls, telemetry or install scripts to
  the package.
- Do not publish, tag or bump versions. Releases run from GitHub Actions when the maintainer pushes a `v*`
  tag.
- Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md), never in an issue or PR.
