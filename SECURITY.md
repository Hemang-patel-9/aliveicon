# Security Policy

## Supported versions

Only the latest release on npm gets security fixes.

| Version      | Supported |
| ------------ | --------- |
| 1.x (latest) | ✅        |
| older        | ❌        |

## Reporting a vulnerability

Please don't open a public issue, discussion or pull request for a security problem.

Report it privately through GitHub: open the
[Security tab](https://github.com/Hemang-patel-9/aliveicon/security) and click **Report a vulnerability**,
or use [this link](https://github.com/Hemang-patel-9/aliveicon/security/advisories/new).

Please include:

- the aliveicon version and the `react` and `framer-motion` versions you use;
- the affected icon or API;
- steps or a minimal repro;
- what you think the impact is.

### What to expect

| Step                      | Target                                                              |
| ------------------------- | ------------------------------------------------------------------- |
| Acknowledgement           | within 7 days                                                       |
| Assessment and next steps | within 14 days of acknowledgement                                   |
| Fix and release           | depends on severity; you will get updates until the advisory closes |

Once a fix is released, the advisory is published with credit to you unless you'd rather stay anonymous.
Please give us a reasonable chance to ship a fix before you disclose publicly.

## Scope

aliveicon is a client-side component library. It makes no network requests, reads no storage, runs no
install scripts and has two runtime dependencies (`clsx`, `tailwind-merge`).

**In scope**

- Code in the published `aliveicon` package that allows script injection or unsafe DOM output
  (for example through props passed to an icon).
- Malicious or unexpected code in a published tarball, install script or dependency.
- Problems in the build or release pipeline that could let someone publish a tampered version.
- Leaked credentials in the repository or its history.

**Out of scope**

- Vulnerabilities in `react`, `framer-motion` or other peer dependencies. Report those upstream.
- Vulnerabilities in the docs site (`apps/web`) that don't affect the published package.
- Findings that need an already compromised build environment or a malicious maintainer.
- Missing `prefers-reduced-motion` handling or other accessibility issues. Please file a normal issue.
- Reports from automated scanners with no demonstrated impact.

## How releases are protected

- Releases are published from GitHub Actions with npm trusted publishing (OIDC), so no long-lived npm
  token is stored in the repository.
- A publish is staged and only goes live after the maintainer approves it.
- The package ships only `dist/` and `THIRD_PARTY_NOTICES.md`.
- `npm test` checks every export from both the ESM and CJS builds before a release.
- Dependabot watches npm and GitHub Actions dependencies.

## Security review guidelines

Every pull request gets these checks before its CI runs are approved. That matters most for first-time
contributors, because CI runs their code.

| Area                                     | What to look for                                                                   |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `package.json` scripts                   | New or changed `preinstall`, `install`, `postinstall`, `prepare`, `prepublishOnly` |
| `package.json` deps, `package-lock.json` | New runtime dependencies; lockfile changes with no matching `package.json` change  |
| `scripts/`, `rollup.config.js`           | Network requests, remote downloads, `eval`, writes outside the repo                |
| `.github/workflows/`                     | Wider `permissions`, `id-token`, `pull_request_target`, secrets, unpinned actions  |
| `src/`                                   | `dangerouslySetInnerHTML`, `innerHTML`, props reaching `href` or `<script>`        |
| Any file                                 | Tokens, `.npmrc` credentials, `.env` files                                         |

If anything in the table shows up, read the full diff of that file before approving workflow runs or
checking the branch out locally. Automated reviewers apply the same checks as P0 rules from
[AGENTS.md → Code Review Rules](AGENTS.md#code-review-rules).

## Threat model

- **What we protect:** the integrity of the `aliveicon` package on npm, the GitHub Actions publish
  pipeline (npm trusted publishing over OIDC, staged and approved by the maintainer), and the browsers
  and servers of apps that render the icons.
- **Entry points:** props passed to icon components, pull requests from forks, npm dependencies and their
  updates, GitHub Actions workflows and third-party actions.
- **Trust boundaries:** code from forks is untrusted until reviewed; CI for first-time contributors runs
  only after approval; only a pushed `v*` tag plus maintainer approval can publish.
- **Main risks:** a tampered release, a malicious install script or dependency, a workflow change that
  leaks the publish identity, and markup injection through icon props.
- **Out of scope:** vulnerabilities in `react`, `framer-motion` and other peer dependencies; the docs site
  in `apps/web`; a compromised maintainer account or build machine.

## Using aliveicon safely

- Install from the official `aliveicon` package on npm and check the name carefully; look-alike names
  exist for most popular packages.
- Commit your lockfile and use `npm ci` in CI.
- Icons render a fixed SVG. Don't build icon props from untrusted input, and don't pass user-controlled
  strings as `className` or `style` without validating them.
- Icons are `aria-hidden`. Give any icon-only button an accessible label of its own.
