import type { ColorTokens, SiteConfig, ThemeConfig } from './config';

export const THEME_KEY = 'aliveicon:theme';

const colorVar = (key: string) => `--c-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

const colorBlock = (colors: ColorTokens) =>
	Object.entries(colors)
		.map(([key, value]) => `${colorVar(key)}:${value};`)
		.join('');

const px = (value: number) => `${value}px`;

const checkerImage = (color: string) => {
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='8' height='8' fill='${color}'/><rect x='8' y='8' width='8' height='8' fill='${color}'/></svg>`;
	return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

function previewVars(theme: ThemeConfig) {
	const { light, dark } = theme.colors;
	return [
		`--p-light-bg:${light.canvas}`,
		`--p-light-fg:${light.icon}`,
		`--p-light-text:${light.textMuted}`,
		`--p-dark-bg:${dark.canvas}`,
		`--p-dark-fg:${dark.icon}`,
		`--p-dark-text:${dark.textMuted}`,
	].join(';');
}

function layoutCss(theme: ThemeConfig) {
	const { phone, tablet } = theme.layout.breakpoints;
	return [
		'.g-shell{display:grid;grid-template-columns:minmax(0,1fr)}',
		'.g-sidebar,.g-rail{display:none}',
		'.g-settings-btn{display:inline-flex}',
		'.g-grid[data-cols="fixed"]{grid-template-columns:repeat(var(--g-cols-phone),minmax(0,1fr))}',
		`@media (min-width:${phone}px){.g-grid[data-cols="fixed"]{grid-template-columns:repeat(var(--g-cols-tablet),minmax(0,1fr))}}`,
		`@media (min-width:${tablet}px){.g-grid[data-cols="fixed"]{grid-template-columns:repeat(var(--g-cols-desktop),minmax(0,1fr))}.g-shell{grid-template-columns:var(--sidebar-w) minmax(0,1fr)}.g-sidebar{display:block}.g-rail{display:flex}.g-settings-btn{display:none}.g-sheet{display:none}}`,
	].join('\n');
}

function structuralVars(theme: ThemeConfig) {
	const { radius, layout, motion, typeScale } = theme;
	const ms = (value: number) => (motion.enabled ? `${value}ms` : '0ms');
	const vars: Record<string, string> = {
		'--r-sm': px(radius.sm),
		'--r-md': px(radius.md),
		'--r-lg': px(radius.lg),
		'--r-tile': px(radius.tile),
		'--r-control': px(radius.control),
		'--r-drawer': px(radius.drawer),
		'--border-w': px(theme.borderWidth),
		'--shadow-raised': theme.shadows.raised,
		'--shadow-overlay': theme.shadows.overlay,
		'--density': theme.spacing.density === 'compact' ? '0.75' : '1',
		'--sidebar-w': px(layout.sidebarWidth),
		'--drawer-w': px(layout.drawerWidth),
		'--content-max': px(layout.contentMaxWidth),
		'--header-h': px(layout.headerHeight),
		'--toolbar-h': px(layout.toolbarHeight),
		'--control-h': px(layout.controlHeight),
		'--bp-phone': px(layout.breakpoints.phone),
		'--bp-tablet': px(layout.breakpoints.tablet),
		'--m-fast': ms(motion.duration.fast),
		'--m-base': ms(motion.duration.base),
		'--m-slow': ms(motion.duration.slow),
		'--m-ease-out': motion.easing.out,
		'--m-ease-in-out': motion.easing.inOut,
	};
	for (const [key, step] of Object.entries(typeScale)) {
		vars[`--t-${key}-size`] = px(step.size);
		vars[`--t-${key}-lh`] = px(step.lineHeight);
		vars[`--t-${key}-ls`] = `${step.letterSpacing}em`;
	}
	return Object.entries(vars)
		.map(([key, value]) => `${key}:${value};`)
		.join('');
}

export function buildThemeCss(config: SiteConfig) {
	const { theme } = config;
	const light = colorBlock(theme.colors.light);
	const dark = colorBlock(theme.colors.dark);
	const fallback = theme.modes.default === 'dark' ? dark : light;
	const fallbackScheme = theme.modes.default === 'dark' ? 'dark' : 'light';

	const parts = [
		`:root{${structuralVars(theme)};${previewVars(theme)}}`,
		`:root:not([data-theme]){color-scheme:${fallbackScheme};${fallback};--checker:${checkerImage(theme.colors[fallbackScheme].border)}}`,
		`:root[data-theme="light"]{color-scheme:light;${light};--checker:${checkerImage(theme.colors.light.border)}}`,
		`:root[data-theme="dark"]{color-scheme:dark;${dark};--checker:${checkerImage(theme.colors.dark.border)}}`,
		layoutCss(theme),
	];

	if (theme.motion.respectReducedMotion) {
		parts.push(
			'@media (prefers-reduced-motion:reduce){:root{--m-fast:0ms;--m-base:0ms;--m-slow:0ms}*,*::before,*::after{scroll-behavior:auto!important}}'
		);
	}
	return parts.join('\n');
}

export function buildThemeScript(config: SiteConfig) {
	const { default: fallback, allowSystem } = config.theme.modes;
	return `(function(){try{var d=document.documentElement;var c=null;try{c=localStorage.getItem(${JSON.stringify(THEME_KEY)})}catch(e){}if(c!=='light'&&c!=='dark'&&c!=='system')c=${JSON.stringify(fallback)};if(c==='system'&&!${JSON.stringify(allowSystem)})c=${JSON.stringify(fallback === 'system' ? 'light' : fallback)};var r=c==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):c;d.setAttribute('data-theme',r);d.setAttribute('data-theme-choice',c)}catch(e){}})();`;
}
