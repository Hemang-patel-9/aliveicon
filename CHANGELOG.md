# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- `BugPlay`, `CameraOff`, `RedoDot`, `Ungroup` and `UserX`. They were already drawn but never exported.
- Correctly spelled exports: `Accessibility`, `AudioWaveform`, `BadgeIndianRupee`, `Bookmark`,
  `BookmarkCheck`, `BookmarkMinus`, `Cctv`, `QrCode`, `Usb`, `WebhookOff`.
- Exported types `AnimatedIconProps`, `AnimatedIconHandle` and `AnimatedIconTriggers`, so a `ref` can be
  typed as `useRef<AnimatedIconHandle>(null)`.
- `aria-hidden="true"` on every icon's `<svg>`.
- `THIRD_PARTY_NOTICES.md` with the Lucide (ISC) and Feather (MIT) licenses.

### Changed

- Each icon is now its own module in the build (ESM and CJS), and `sideEffects` is `false`, so bundlers
  only include the icons you import.
- 455 icons now share one trigger implementation (`useAnimatedIcon`), so hover, loop, click, mount and
  `ref` behave the same way across them.
- `startAnimation()` on a `ref` now plays once and returns to rest on every icon.
- Moving the pointer away now returns the icon to rest on every icon that uses the shared hook.
- `tailwindcss` is no longer installed as a runtime dependency.
- `package.json` `license` now says MIT, matching `LICENSE`.

### Deprecated

- `AccessibilityActivity`, `AudioWaveForm`, `BadgeIndianRuppee`, `BookMark`, `BookMarkCheck`,
  `BookMarkMinus`, `CCTV`, `QRCode`, `USB`, `WebhooksOff`. Use the correctly spelled names above. The
  old names will be removed in 2.0.0.

### Fixed

- `'use client'` is now kept in the published files. Before, the build stripped it, so importing an icon
  from a Next.js Server Component failed.
- `loopOnHover` now stops when the pointer leaves. Before, the first hover started a loop that never
  ended.
- `AirVent` now supports `autoAnimateOnLoad`, `hoverable`, `loopOnHover` and `animateOnClick`.
- Removed `console.log('started animation')` from `Activity`, `AudioWaveform` and `SquareActivity`.
- Pending animations are cancelled when an icon unmounts.
- The ESM build is marked `"type": "module"`, so Node-based SSR (for example Vite SSR) can load it.

## [1.0.32]

Last release before this changelog was started.
