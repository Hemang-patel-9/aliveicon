# aliveicon

> Animated line icons for React. They draw themselves on hover, click, or page load.

<p align="left">
  <a href="https://www.npmjs.com/package/aliveicon"><img src="https://img.shields.io/npm/v/aliveicon.svg?color=blue" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/aliveicon"><img src="https://img.shields.io/npm/dm/aliveicon.svg?color=blue" alt="npm downloads" /></a>
  <a href="https://github.com/Hemang-patel-9/aliveicon/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/aliveicon.svg?color=green" alt="license" /></a>
  <img src="https://img.shields.io/badge/icons-520-orange" alt="icon count" />
  <img src="https://img.shields.io/badge/types-included-blue" alt="typescript" />
</p>

`aliveicon` is a set of **520 animated SVG icons** for React. Each icon is a component that animates its strokes with [Framer Motion](https://motion.dev). Drop one in and it comes alive on hover, on click, or as soon as it mounts.

---

## ✨ Features

- 🎬 **Animated out of the box**: strokes draw, bounce, spin or wiggle using Framer Motion.
- 🖱️ **Trigger it your way**: hover, click, mount, loop while hovered, or drive it from a parent through a `ref`.
- 🎨 **Inherits your color**: icons use `currentColor`, so they match the surrounding text.
- 📏 **One `size` prop** sets the width and height in pixels.
- 🌳 **Tree-shakeable**: each icon is its own module, so your bundle only contains the icons you import.
- 🔠 **TypeScript**: full prop types, plus `AnimatedIconProps` and `AnimatedIconHandle` for your own code.
- ⚛️ **React 18/19 and Next.js App Router**: every module ships with `'use client'`, so you can import icons from Server Components.

---

## 📦 Installation

```bash
npm install aliveicon framer-motion
```

```bash
# or
yarn add aliveicon framer-motion
pnpm add aliveicon framer-motion
bun add aliveicon framer-motion
```

### Peer dependencies

| Package | Version |
| ------- | ------- |
| `react` | `>=18.0.0` |
| `react-dom` | `>=18.0.0` |
| `framer-motion` | `>=10.0.0` |

---

## 🚀 Quick start

```tsx
import { Activity, BellRing, Rocket } from 'aliveicon';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: 16, color: '#6366f1' }}>
      {/* Animates on hover by default */}
      <Activity size={32} />

      {/* Keeps looping while hovered, stops when the pointer leaves */}
      <BellRing size={32} loopOnHover />

      {/* Plays when clicked */}
      <Rocket size={32} animateOnClick />
    </div>
  );
}
```

---

## 🎛️ Props

Every icon has the same API. All props are optional, and any other props (`onClick`, `aria-label`, `id`, …) are passed to the wrapping `<div>`.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `number` | `28` | Width and height in pixels. |
| `hoverable` | `boolean` | `true` | Play when the pointer enters the icon. Ignored while a `ref` is attached (see below). |
| `loopOnHover` | `boolean` | `false` | Keep replaying while hovered; stops when the pointer leaves. |
| `animateOnClick` | `boolean` | `false` | Play when the icon is clicked. |
| `autoAnimateOnLoad` | `boolean` | `false` | Play once when the component mounts. |
| `className` | `string` | — | Classes for the wrapper. Merged with [`tailwind-merge`](https://github.com/dcastil/tailwind-merge), so conflicting Tailwind classes resolve cleanly. |
| `style` | `React.CSSProperties` | — | Inline styles for the wrapper. |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | — | Any other div attribute. |

---

## 🕹️ Controlling an icon from a parent

Pass a `ref` to start and stop the animation yourself, for example when the whole button is hovered rather than just the icon:

```tsx
import { useRef } from 'react';
import { ArchiveX, type AnimatedIconHandle } from 'aliveicon';

export function DeleteButton() {
  const icon = useRef<AnimatedIconHandle>(null);

  return (
    <button
      onMouseEnter={() => icon.current?.startAnimation()}
      onMouseLeave={() => icon.current?.stopAnimation()}
    >
      <ArchiveX ref={icon} size={18} /> Delete
    </button>
  );
}
```

| Method | What it does |
| ------ | ------------ |
| `startAnimation()` | Plays the animation once, then returns to rest. |
| `stopAnimation()` | Stops any running animation and returns to rest. |

While a `ref` is attached the icon ignores its own hover, so the parent is in charge. `animateOnClick` and `autoAnimateOnLoad` still work.

---

## 🎨 Styling & color

Icons are drawn with `stroke="currentColor"`, so they take the **text color** of their container:

```tsx
<Activity style={{ color: '#e11d48' }} />

<div style={{ color: 'tomato' }}>
  <Activity />
</div>

<Activity className="text-emerald-500" />
```

---

## ♿ Accessibility

The SVG inside each icon has `aria-hidden="true"`, so screen readers skip decorative icons. When an icon carries meaning on its own, label the wrapper:

```tsx
<Bell role="img" aria-label="Notifications" />
```

---

## 📚 Available icons

`aliveicon` ships **520 icons**, and more are being added. Import any icon by its PascalCase name:

```tsx
import { CircleCheck, ChartLine, Wifi } from 'aliveicon';
```

| Group | Count | Examples |
| ----- | ----- | -------- |
| **A** | 78 | `Activity`, `Airplay`, `AlarmClock`, `Anchor`, `ArrowRight`, `Atom`, `Award` |
| **B** | 128 | `Battery`, `Bell`, `Bluetooth`, `Book`, `Bot`, `Brain`, `Bug`, `Building` |
| **C** | 140 | `Calendar`, `Camera`, `Car`, `ChartLine`, `Check`, `ChevronDown`, `Circle`, `Clock` |
| **N** | 16 | `Navigation`, `Network`, `Newspaper`, `Notebook`, `Nut` |
| **O** | 10 | `Octagon`, `Omega`, `Option`, `Orbit`, `Origami` |
| **Q** | 2 | `Quote`, `QrCode` |
| **R** | 50 | `Rabbit`, `Radar`, `Radio`, `Receipt`, `RefreshCw`, `Rocket`, `RotateCcw` |
| **S** | 1 | `SquareActivity` |
| **U** | 35 | `Umbrella`, `Undo`, `Upload`, `User`, `Users`, `Utensils` |
| **V** | 20 | `Variable`, `Vault`, `Video`, `Volume`, `Vote` |
| **W** | 33 | `Wallet`, `Wand`, `Watch`, `Waves`, `Webcam`, `Wifi`, `Wind`, `Wrench` |
| **X** | 2 | `X`, `XTwitter` |
| **Y** | 1 | `YouTube` |
| **Z** | 4 | `Zap`, `ZapOff`, `ZoomIn`, `ZoomOut` |

The full list lives in [`src/index.ts`](src/index.ts), and your editor's autocomplete will show every icon as you type.

### Renamed icons

These names were misspelled in earlier versions. The old names still work but are deprecated and will be removed in the next major version.

| Old name | Use instead |
| -------- | ----------- |
| `AccessibilityActivity` | `Accessibility` |
| `AudioWaveForm` | `AudioWaveform` |
| `BadgeIndianRuppee` | `BadgeIndianRupee` |
| `BookMark`, `BookMarkCheck`, `BookMarkMinus` | `Bookmark`, `BookmarkCheck`, `BookmarkMinus` |
| `CCTV` | `Cctv` |
| `QRCode` | `QrCode` |
| `USB` | `Usb` |
| `WebhooksOff` | `WebhookOff` |

---

## 🎬 How the animation works

Each icon is an inline SVG whose strokes are Framer Motion elements (`motion.path`, `motion.circle`, …) with two variants: a resting state and an `animate` state. A shared hook, `useAnimatedIcon`, decides *when* to play: on hover, click, mount, in a loop, or when a parent calls the `ref` methods. It plays the `animate` variant and then settles back to rest.

---

## 🤝 Contributing

```bash
npm install
npm run check   # index up to date, icon lint, formatting, type-check
npm run build
npm test        # renders every icon from the built package
```

New icons go in `src/icons/<first letter>/<IconName>.tsx` and use `useAnimatedIcon` from `src/lib`. Run `npm run generate` afterwards to add them to `src/index.ts`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, and please follow the [Code of Conduct](CODE_OF_CONDUCT.md). Security issues go through [SECURITY.md](SECURITY.md).

---

## 🙏 Credits

Icon shapes are based on [Lucide](https://lucide.dev) (ISC). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## 📄 License

[MIT](LICENSE) © Hemang Baldha
