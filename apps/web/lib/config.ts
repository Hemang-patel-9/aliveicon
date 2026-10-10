export interface ColorTokens {
	canvas: string;
	surface: string;
	surfaceRaised: string;
	surfaceSunken: string;
	border: string;
	borderStrong: string;
	text: string;
	textMuted: string;
	textSubtle: string;
	textInverse: string;
	accent: string;
	accentHover: string;
	accentText: string;
	focusRing: string;
	selection: string;
	icon: string;
	success: string;
	warning: string;
	danger: string;
	codeBg: string;
	codeText: string;
	overlay: string;
}

export interface TypeStep {
	size: number;
	lineHeight: number;
	letterSpacing: number;
}

export type TypeScaleKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type FontChoice = 'geist' | 'system';

export interface ThemeConfig {
	modes: { default: 'light' | 'dark' | 'system'; allowSystem: boolean };
	colors: { light: ColorTokens; dark: ColorTokens };
	fonts: { sans: FontChoice; mono: FontChoice };
	typeScale: Record<TypeScaleKey, TypeStep>;
	radius: {
		sm: number;
		md: number;
		lg: number;
		tile: number;
		control: number;
		drawer: number;
	};
	borderWidth: number;
	shadows: { raised: string; overlay: string };
	spacing: { density: 'compact' | 'comfortable' };
	layout: {
		sidebarWidth: number;
		drawerWidth: number;
		contentMaxWidth: number;
		headerHeight: number;
		toolbarHeight: number;
		controlHeight: number;
		breakpoints: { phone: number; tablet: number };
	};
	motion: {
		enabled: boolean;
		respectReducedMotion: boolean;
		duration: { fast: number; base: number; slow: number };
		easing: { out: string; inOut: string };
		drawerSpring: { stiffness: number; damping: number; mass: number };
	};
}

export interface NavLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface SiteSection {
	name: string;
	tagline: string;
	description: string;
	url: string;
	basePath: string;
	repoUrl: string;
	npmUrl: string;
	lucideUrl: string;
	nav: NavLink[];
	footer: { columns: { title: string; links: NavLink[] }[]; credit: string; license: string };
}

export interface NumberSetting {
	default: number;
	min: number;
	max: number;
	step: number;
	visible?: boolean;
}

export interface OptionSetting<T extends string> {
	default: T;
	options: readonly T[];
	visible?: boolean;
}

export interface ToggleSetting {
	default: boolean;
	visible?: boolean;
}

export interface GalleryConfig {
	iconSize: NumberSetting;
	iconColor: { default: string; presets: string[]; allowCustom: boolean; visible?: boolean };
	columns: {
		mode: OptionSetting<'auto' | 'fixed'>;
		fixed: { phone: NumberSetting; tablet: NumberSetting; desktop: NumberSetting };
	};
	tileWidth: NumberSetting;
	tileAspect: NumberSetting;
	gap: NumberSetting;
	tileStyle: OptionSetting<'card' | 'minimal' | 'hairline'>;
	showNames: ToggleSetting;
	nameFormat: OptionSetting<'pascal' | 'kebab'>;
	namePosition: OptionSetting<'below' | 'tooltip'>;
	preview: OptionSetting<'canvas' | 'light' | 'dark' | 'checker'>;
	triggers: {
		hoverable: ToggleSetting;
		loopOnHover: ToggleSetting;
		animateOnClick: ToggleSetting;
		autoAnimateOnLoad: ToggleSetting;
	};
	groupByLetter: ToggleSetting;
	letterRail: ToggleSetting;
	showAliases: ToggleSetting;
	clickAction: OptionSetting<'drawer' | 'page' | 'copy'>;
	copyFormat: OptionSetting<'import' | 'jsx' | 'name'>;
}

export interface DrawerConfig {
	previewSizes: number[];
	largePreviewSize: number;
	codeTabs: ('import' | 'jsx' | 'ref')[];
	showLucideLink: boolean;
	showPrevNext: boolean;
}

export interface FeaturesConfig {
	playAll: boolean;
	modeBadge: boolean;
	newBadge: boolean;
	shareSettingsLink: boolean;
	keyboardShortcuts: boolean;
}

export interface PerformanceConfig {
	hydrateChunkSize: number;
	eagerChunks: number;
	hydrateMargin: number;
	hydrateGapMs: number;
	preloadDelayMs: number;
}

export interface SiteConfig {
	site: SiteSection;
	theme: ThemeConfig;
	gallery: GalleryConfig;
	drawer: DrawerConfig;
	features: FeaturesConfig;
	performance: PerformanceConfig;
}

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function channel(value: number) {
	const v = value / 255;
	return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
	let h = hex.slice(1);
	if (h.length === 3 || h.length === 4) {
		h = h
			.split('')
			.map((c) => c + c)
			.join('');
	}
	const r = parseInt(h.slice(0, 2), 16);
	const g = parseInt(h.slice(2, 4), 16);
	const b = parseInt(h.slice(4, 6), 16);
	return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a: string, b: string) {
	const la = luminance(a);
	const lb = luminance(b);
	return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const CONTRAST_PAIRS: [keyof ColorTokens, keyof ColorTokens, number][] = [
	['text', 'canvas', 4.5],
	['text', 'surface', 4.5],
	['text', 'surfaceRaised', 4.5],
	['text', 'surfaceSunken', 4.5],
	['textMuted', 'canvas', 4.5],
	['textMuted', 'surface', 4.5],
	['textSubtle', 'canvas', 4.5],
	['textSubtle', 'surface', 4.5],
	['accentText', 'accent', 4.5],
	['accentText', 'accentHover', 4.5],
	['textInverse', 'accent', 4.5],
	['codeText', 'codeBg', 4.5],
	['focusRing', 'canvas', 3],
	['icon', 'canvas', 3],
	['icon', 'surface', 3],
	['success', 'canvas', 4.5],
	['warning', 'canvas', 4.5],
	['danger', 'canvas', 4.5],
];

function checkNumber(errors: string[], path: string, s: NumberSetting) {
	if (!(s.step > 0)) errors.push(`${path}.step must be greater than 0`);
	if (!(s.min <= s.max)) errors.push(`${path}: min ${s.min} is above max ${s.max}`);
	if (s.default < s.min || s.default > s.max) {
		errors.push(`${path}.default ${s.default} is outside ${s.min}..${s.max}`);
	}
}

function checkOption<T extends string>(errors: string[], path: string, s: OptionSetting<T>) {
	if (s.options.length === 0) errors.push(`${path}.options is empty`);
	if (!s.options.includes(s.default)) {
		errors.push(`${path}.default "${s.default}" is not one of ${s.options.join(', ')}`);
	}
}

export function validateConfig(config: SiteConfig): string[] {
	const errors: string[] = [];
	const { site, theme, gallery, drawer } = config;

	if (!site.name.trim()) errors.push('site.name is empty');
	if (site.basePath && !/^\/[^/].*[^/]$|^\/[^/]$/.test(site.basePath)) {
		errors.push('site.basePath must start with "/" and not end with "/"');
	}
	if (!/^https?:\/\//.test(site.url) || site.url.endsWith('/')) {
		errors.push('site.url must be an absolute URL without a trailing slash');
	}

	for (const mode of ['light', 'dark'] as const) {
		const colors = theme.colors[mode];
		for (const [key, value] of Object.entries(colors)) {
			if (!HEX.test(value))
				errors.push(`theme.colors.${mode}.${key} "${value}" is not a hex color`);
		}
		for (const [a, b, min] of CONTRAST_PAIRS) {
			if (!HEX.test(colors[a]) || !HEX.test(colors[b])) continue;
			const ratio = contrast(colors[a], colors[b]);
			if (ratio < min) {
				errors.push(
					`theme.colors.${mode}: ${a} on ${b} has contrast ${ratio.toFixed(2)}, needs ${min}`
				);
			}
		}
	}

	if (theme.modes.default === 'system' && !theme.modes.allowSystem) {
		errors.push('theme.modes.default is "system" but allowSystem is false');
	}

	for (const [key, step] of Object.entries(theme.typeScale)) {
		if (step.size <= 0 || step.lineHeight < step.size) {
			errors.push(`theme.typeScale.${key}: lineHeight must be at least the size`);
		}
	}
	for (const [key, value] of Object.entries(theme.radius)) {
		if (value < 0) errors.push(`theme.radius.${key} must not be negative`);
	}
	if (theme.borderWidth < 0) errors.push('theme.borderWidth must not be negative');

	const { layout, motion } = theme;
	if (layout.breakpoints.phone >= layout.breakpoints.tablet) {
		errors.push('theme.layout.breakpoints.phone must be below tablet');
	}
	if (layout.controlHeight < 24) errors.push('theme.layout.controlHeight must be at least 24');
	for (const key of [
		'sidebarWidth',
		'drawerWidth',
		'contentMaxWidth',
		'headerHeight',
		'toolbarHeight',
	] as const) {
		if (layout[key] <= 0) errors.push(`theme.layout.${key} must be positive`);
	}
	for (const [key, value] of Object.entries(motion.duration)) {
		if (value < 0) errors.push(`theme.motion.duration.${key} must not be negative`);
	}
	const spring = motion.drawerSpring;
	if (spring.stiffness <= 0 || spring.damping <= 0 || spring.mass <= 0) {
		errors.push('theme.motion.drawerSpring values must be positive');
	}

	const numbers: [string, NumberSetting][] = [
		['gallery.iconSize', gallery.iconSize],
		['gallery.columns.fixed.phone', gallery.columns.fixed.phone],
		['gallery.columns.fixed.tablet', gallery.columns.fixed.tablet],
		['gallery.columns.fixed.desktop', gallery.columns.fixed.desktop],
		['gallery.tileWidth', gallery.tileWidth],
		['gallery.tileAspect', gallery.tileAspect],
		['gallery.gap', gallery.gap],
	];
	for (const [path, setting] of numbers) checkNumber(errors, path, setting);

	checkOption(errors, 'gallery.columns.mode', gallery.columns.mode);
	checkOption(errors, 'gallery.tileStyle', gallery.tileStyle);
	checkOption(errors, 'gallery.nameFormat', gallery.nameFormat);
	checkOption(errors, 'gallery.namePosition', gallery.namePosition);
	checkOption(errors, 'gallery.preview', gallery.preview);
	checkOption(errors, 'gallery.clickAction', gallery.clickAction);
	checkOption(errors, 'gallery.copyFormat', gallery.copyFormat);

	const color = gallery.iconColor;
	if (color.default !== 'theme' && !HEX.test(color.default)) {
		errors.push('gallery.iconColor.default must be "theme" or a hex color');
	}
	for (const preset of color.presets) {
		if (preset !== 'theme' && !HEX.test(preset)) {
			errors.push(`gallery.iconColor.presets "${preset}" is not "theme" or a hex color`);
		}
	}
	if (color.default !== 'theme' && !color.presets.includes(color.default) && !color.allowCustom) {
		errors.push('gallery.iconColor.default is not in presets and custom colors are not allowed');
	}

	const { performance } = config;
	if (!Number.isInteger(performance.hydrateChunkSize) || performance.hydrateChunkSize < 1) {
		errors.push('performance.hydrateChunkSize must be a positive integer');
	}
	if (!Number.isInteger(performance.eagerChunks) || performance.eagerChunks < 0) {
		errors.push('performance.eagerChunks must be a non-negative integer');
	}
	if (performance.hydrateMargin < 0) errors.push('performance.hydrateMargin must not be negative');
	if (performance.preloadDelayMs < 0)
		errors.push('performance.preloadDelayMs must not be negative');
	if (performance.hydrateGapMs < 0) errors.push('performance.hydrateGapMs must not be negative');

	if (drawer.previewSizes.length === 0) errors.push('drawer.previewSizes is empty');
	if (drawer.previewSizes.some((s) => s <= 0)) errors.push('drawer.previewSizes must be positive');
	if (drawer.largePreviewSize <= 0) errors.push('drawer.largePreviewSize must be positive');
	if (drawer.codeTabs.length === 0) errors.push('drawer.codeTabs is empty');

	return errors;
}

export function assertConfig(config: SiteConfig) {
	const errors = validateConfig(config);
	if (errors.length > 0) {
		throw new Error(`site.config.ts is invalid:\n- ${errors.join('\n- ')}`);
	}
}
