# aliveicon

> Beautiful, animated line icons — they draw themselves on hover, click, or page load.

<p align="left">
  <a href="https://www.npmjs.com/package/aliveicon"><img src="https://img.shields.io/npm/v/aliveicon.svg?color=blue" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/aliveicon"><img src="https://img.shields.io/npm/dm/aliveicon.svg?color=blue" alt="npm downloads" /></a>
  <a href="https://github.com/Hemang-patel-9/aliveicon/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/aliveicon.svg?color=green" alt="license" /></a>
  <img src="https://img.shields.io/badge/icons-515%2B-orange" alt="icon count" />
  <img src="https://img.shields.io/badge/types-included-blue" alt="typescript" />
</p>

`aliveicon` is a collection of **515+ ready-to-use animated SVG icons** for React. Every icon is a real component that "draws" its stroke with a smooth path animation powered by [Framer Motion](https://www.framer.com/motion/). Drop one into your app and it comes alive on hover, on click, or as soon as it mounts — no extra wiring required.

---

## ✨ Features

- 🎬 **Animated out of the box** — icons draw their outlines using Framer Motion path animations.
- 🖱️ **Trigger however you like** — animate on hover, on click, on mount, or loop continuously.
- 🎨 **Inherits your color** — icons use `currentColor`, so they match your text color automatically.
- 📏 **Resizable** — set any pixel size with a single `size` prop.
- 🌳 **Tree-shakeable ESM + CJS builds** — import only the icons you use.
- 🔠 **TypeScript first** — full type definitions and IntelliSense for every prop.
- ⚛️ **React 18+, Javsacript & Next.js ready** — components are marked `'use client'` and work in the App Router.

---

## 📦 Installation

```bash
npm install aliveicon
```

```bash
# or with your package manager of choice
yarn add aliveicon
pnpm add aliveicon
bun add aliveicon
```

### Peer dependencies

`aliveicon` relies on the following packages already being installed in your project:

| Package | Version |
| ------- | ------- |
| `react` | `>=18.0.0` |
| `react-dom` | `>=18.0.0` |
| `framer-motion` | `>=10.0.0` |

```bash
npm install react react-dom framer-motion
```

---

## 🚀 Quick start

```tsx
import { Activity, BellRing, Rocket } from 'aliveicon';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: 16, color: '#6366f1' }}>
      {/* Animates on hover by default */}
      <Activity size={32} />

      {/* Keeps looping while hovered */}
      <BellRing size={32} loopOnHover />

      {/* Plays the animation when clicked */}
      <Rocket size={32} animateOnClick />
    </div>
  );
}
```

That's it. By default an icon plays its animation whenever the user hovers over it.

---

## 🎛️ Props

Every icon shares the same API. All props are optional, and any extra props (`onClick`, `aria-label`, `id`, …) are forwarded to the wrapping `<div>`.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `number` | `28` | Width and height of the icon, in pixels. |
| `hoverable` | `boolean` | `true` | Play the animation when the user hovers over the icon. |
| `loopOnHover` | `boolean` | `false` | Keep replaying the animation for as long as the icon is hovered. |
| `animateOnClick` | `boolean` | `false` | Play the animation when the icon is clicked. |
| `autoAnimateOnLoad` | `boolean` | `false` | Play the animation once, automatically, when the component mounts. |
| `className` | `string` | — | Extra classes merged onto the wrapper (deduped via `tailwind-merge`). |
| `style` | `React.CSSProperties` | — | Inline styles applied to the wrapper element. |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | — | Any other div attributes — `onClick`, `onMouseEnter`, `aria-*`, etc. |

---

## 🎨 Styling & color

Icons are drawn with `stroke="currentColor"`, so they take on the **text color** of their container. Change the color the same way you'd change text color:

```tsx
{/* Inline style */}
<Activity style={{ color: '#e11d48' }} />

{/* Inherit from a parent */}
<div style={{ color: 'tomato' }}>
  <Activity />
</div>

{/* Tailwind utility classes */}
<Activity className="text-emerald-500" />
```

### Sizing

```tsx
<Activity size={16} />
<Activity size={24} />
<Activity size={48} />
```

---

## 🧩 Usage examples

**Animate automatically on page load**

```tsx
<Rocket autoAnimateOnLoad />
```

**Loop the animation while hovering**

```tsx
<Bell loopOnHover />
```

**Animate on click instead of hover**

```tsx
<Heart hoverable={false} animateOnClick />
```

**Use inside a button with your own handler**

```tsx
<button onClick={() => console.log('clicked')}>
  <Trash animateOnClick aria-label="Delete" />
</button>
```

---

## 📚 Available icons

`aliveicon` currently ships **515+ icons** and is actively growing. Import any icon by its named export (PascalCase):

```tsx
import { CircleCheck, ChartLine, ShieldAlert } from 'aliveicon';
```

| Group | Count | Examples |
| ----- | ----- | -------- |
| **A** | 78 | `Activity`, `Airplay`, `AlarmClock`, `Anchor`, `ArrowRight`, `Atom`, `Award` |
| **B** | 128 | `Battery`, `Bell`, `Bluetooth`, `Book`, `Bot`, `Brain`, `Bug`, `Building` |
| **C** | 140 | `Calendar`, `Camera`, `Car`, `ChartLine`, `Check`, `ChevronDown`, `Circle`, `Clock` |
| **N** | 16 | `Navigation`, `Network`, `Newspaper`, `Notebook`, `Nut` |
| **O** | 10 | `Octagon`, `Omega`, `Option`, `Orbit`, `Origami` |
| **Q** | 2 | `Quote`, `QRCode` |
| **R** | 50 | `Rabbit`, `Radar`, `Radio`, `Receipt`, `RefreshCw`, `Rocket`, `RotateCcw` |
| **U** | 35 | `Umbrella`, `Undo`, `Upload`, `User`, `Users`, `Utensils` |
| **V** | 20 | `Variable`, `Vault`, `Video`, `Volume`, `Vote` |
| **W** | 33 | `Wallet`, `Wand`, `Watch`, `Waves`, `Webcam`, `Wifi`, `Wind`, `Wrench` |
| **X** | 2 | `X`, `XTwitter` |
| **Y** | 1 | `YouTube` |
| **Z** | 4 | `Zap`, `ZapOff`, `ZoomIn`, `ZoomOut` |

> The full, type-checked list of exports lives in [`src/index.ts`](src/index.ts). Your editor's autocomplete will surface every available icon as you type.

---

## 🎬 How the animation works

Each icon is an inline SVG whose stroke paths are rendered as Framer Motion `motion.path` elements. When triggered, the icon animates its `pathLength`, `pathOffset`, and `opacity` to redraw the outline from scratch, then settles back into its resting state. Triggers (`hover`, `click`, `mount`, `loop`) simply decide *when* that animation runs, using Framer Motion's `useAnimation` controls under the hood.

---

## 📄 License

[MIT](LICENSE) © Hemang Baldha