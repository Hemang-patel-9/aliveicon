import type { GalleryConfig } from '@/lib/config';
import { siteConfig } from '@/site.config';

export interface Settings {
	iconSize: number;
	iconColor: string;
	columnsMode: 'auto' | 'fixed';
	colsPhone: number;
	colsTablet: number;
	colsDesktop: number;
	tileWidth: number;
	tileAspect: number;
	gap: number;
	tileStyle: 'card' | 'minimal' | 'hairline';
	showNames: boolean;
	nameFormat: 'pascal' | 'kebab';
	namePosition: 'below' | 'tooltip';
	preview: 'canvas' | 'light' | 'dark' | 'checker';
	hoverable: boolean;
	loopOnHover: boolean;
	animateOnClick: boolean;
	autoAnimateOnLoad: boolean;
	groupByLetter: boolean;
	letterRail: boolean;
	showAliases: boolean;
	clickAction: 'drawer' | 'page' | 'copy';
	copyFormat: 'import' | 'jsx' | 'name';
}

export type SettingKey = keyof Settings;

export type GroupId = 'icon' | 'layout' | 'tiles' | 'triggers' | 'behavior';

interface FieldBase {
	key: SettingKey;
	label: string;
	hint?: string;
	group: GroupId;
	urlKey: string;
	visible: boolean;
	when?: (settings: Settings) => boolean;
}

export interface NumberField extends FieldBase {
	kind: 'number';
	default: number;
	min: number;
	max: number;
	step: number;
	unit?: string;
}

export interface OptionField extends FieldBase {
	kind: 'option';
	default: string;
	options: readonly string[];
	labels: Record<string, string>;
}

export interface ToggleField extends FieldBase {
	kind: 'toggle';
	default: boolean;
}

export interface ColorField extends FieldBase {
	kind: 'color';
	default: string;
	presets: string[];
	allowCustom: boolean;
}

export type Field = NumberField | OptionField | ToggleField | ColorField;

export const GROUP_LABELS: Record<GroupId, string> = {
	icon: 'Icon',
	layout: 'Layout',
	tiles: 'Tiles',
	triggers: 'Animation triggers',
	behavior: 'Behavior',
};

export const GROUP_ORDER: GroupId[] = ['icon', 'layout', 'tiles', 'triggers', 'behavior'];

export const COLOR_FALLBACK = siteConfig.theme.colors.light.icon;

const g: GalleryConfig = siteConfig.gallery;
const isFixed = (s: Settings) => s.columnsMode === 'fixed';
const isAuto = (s: Settings) => s.columnsMode === 'auto';

const number = (
	key: SettingKey,
	urlKey: string,
	group: GroupId,
	label: string,
	setting: { default: number; min: number; max: number; step: number; visible?: boolean },
	extra: Partial<Pick<NumberField, 'unit' | 'hint' | 'when'>> = {}
): NumberField => ({
	kind: 'number',
	key,
	urlKey,
	group,
	label,
	default: setting.default,
	min: setting.min,
	max: setting.max,
	step: setting.step,
	visible: setting.visible !== false,
	...extra,
});

const option = (
	key: SettingKey,
	urlKey: string,
	group: GroupId,
	label: string,
	setting: { default: string; options: readonly string[]; visible?: boolean },
	labels: Record<string, string>,
	extra: Partial<Pick<OptionField, 'hint' | 'when'>> = {}
): OptionField => ({
	kind: 'option',
	key,
	urlKey,
	group,
	label,
	default: setting.default,
	options: setting.options,
	labels,
	visible: setting.visible !== false && setting.options.length > 1,
	...extra,
});

const toggle = (
	key: SettingKey,
	urlKey: string,
	group: GroupId,
	label: string,
	setting: { default: boolean; visible?: boolean },
	extra: Partial<Pick<ToggleField, 'hint' | 'when'>> = {}
): ToggleField => ({
	kind: 'toggle',
	key,
	urlKey,
	group,
	label,
	default: setting.default,
	visible: setting.visible !== false,
	...extra,
});

export const fields: Field[] = [
	number('iconSize', 'size', 'icon', 'Size', g.iconSize, { unit: 'px' }),
	{
		kind: 'color',
		key: 'iconColor',
		urlKey: 'color',
		group: 'icon',
		label: 'Color',
		default: g.iconColor.default,
		presets: g.iconColor.presets,
		allowCustom: g.iconColor.allowCustom,
		visible: g.iconColor.visible !== false,
	},
	option(
		'columnsMode',
		'cols',
		'layout',
		'Columns',
		g.columns.mode,
		{ auto: 'Auto', fixed: 'Fixed' },
		{ hint: 'Auto fits as many as the tile width allows.' }
	),
	number('colsPhone', 'c1', 'layout', 'Phone columns', g.columns.fixed.phone, { when: isFixed }),
	number('colsTablet', 'c2', 'layout', 'Tablet columns', g.columns.fixed.tablet, { when: isFixed }),
	number('colsDesktop', 'c3', 'layout', 'Desktop columns', g.columns.fixed.desktop, {
		when: isFixed,
	}),
	number('tileWidth', 'tw', 'layout', 'Tile width', g.tileWidth, { unit: 'px', when: isAuto }),
	number('tileAspect', 'ta', 'layout', 'Tile shape', g.tileAspect, {
		hint: 'Width divided by height.',
	}),
	number('gap', 'gap', 'layout', 'Gap', g.gap, { unit: 'px' }),
	option('tileStyle', 'style', 'tiles', 'Tile style', g.tileStyle, {
		card: 'Card',
		minimal: 'Minimal',
		hairline: 'Hairline',
	}),
	option('preview', 'bg', 'tiles', 'Tile background', g.preview, {
		canvas: 'Page',
		light: 'Light',
		dark: 'Dark',
		checker: 'Checker',
	}),
	toggle('showNames', 'names', 'tiles', 'Show names', g.showNames),
	option('nameFormat', 'nf', 'tiles', 'Name format', g.nameFormat, {
		pascal: 'PascalCase',
		kebab: 'kebab-case',
	}),
	option('namePosition', 'np', 'tiles', 'Name position', g.namePosition, {
		below: 'Below',
		tooltip: 'Tooltip',
	}),
	toggle('hoverable', 'hv', 'triggers', 'Play on hover', g.triggers.hoverable),
	toggle('loopOnHover', 'lp', 'triggers', 'Loop while hovered', g.triggers.loopOnHover),
	toggle('animateOnClick', 'oc', 'triggers', 'Play on click', g.triggers.animateOnClick),
	toggle('autoAnimateOnLoad', 'am', 'triggers', 'Play on mount', g.triggers.autoAnimateOnLoad),
	option('clickAction', 'act', 'behavior', 'Tile click', g.clickAction, {
		drawer: 'Open drawer',
		page: 'Open page',
		copy: 'Copy',
	}),
	option('copyFormat', 'copy', 'behavior', 'Copy as', g.copyFormat, {
		import: 'Import line',
		jsx: 'JSX',
		name: 'Name',
	}),
	toggle('groupByLetter', 'group', 'behavior', 'Group by letter', g.groupByLetter),
	toggle('letterRail', 'rail', 'behavior', 'Letter rail', g.letterRail),
	toggle('showAliases', 'alias', 'behavior', 'Show deprecated names', g.showAliases, {
		hint: 'Old misspelled names that still work.',
	}),
];

export const fieldByKey = new Map<SettingKey, Field>(fields.map((f) => [f.key, f]));

export const defaults = Object.fromEntries(
	fields.map((f) => [f.key, f.default])
) as unknown as Settings;

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

function decimals(step: number) {
	const text = String(step);
	const dot = text.indexOf('.');
	return dot === -1 ? 0 : text.length - dot - 1;
}

function snap(field: NumberField, raw: number) {
	const clamped = Math.min(field.max, Math.max(field.min, raw));
	const stepped = Math.round((clamped - field.min) / field.step) * field.step + field.min;
	return Number(Math.min(field.max, stepped).toFixed(decimals(field.step)));
}

export function sanitize<K extends SettingKey>(key: K, value: unknown): Settings[K] {
	const field = fieldByKey.get(key);
	if (!field) return undefined as unknown as Settings[K];
	if (!field.visible) return field.default as Settings[K];

	switch (field.kind) {
		case 'number': {
			const n = typeof value === 'number' ? value : Number(value);
			return (Number.isFinite(n) ? snap(field, n) : field.default) as Settings[K];
		}
		case 'option':
			return (
				typeof value === 'string' && field.options.includes(value) ? value : field.default
			) as Settings[K];
		case 'toggle':
			return (typeof value === 'boolean' ? value : field.default) as Settings[K];
		case 'color': {
			if (typeof value !== 'string') return field.default as Settings[K];
			const lower = value.toLowerCase();
			if (field.presets.some((p) => p.toLowerCase() === lower)) return lower as Settings[K];
			if (field.allowCustom && HEX.test(lower)) return lower as Settings[K];
			return field.default as Settings[K];
		}
	}
}

export function sanitizeAll(input: Partial<Record<SettingKey, unknown>>): Settings {
	const out = { ...defaults } as Record<SettingKey, unknown>;
	for (const field of fields) {
		if (field.key in input) out[field.key] = sanitize(field.key, input[field.key]);
	}
	return out as unknown as Settings;
}

export function matchesDefaults(settings: Settings) {
	return fields.every((field) => settings[field.key] === field.default);
}

export function isDefault(settings: Settings, key: SettingKey) {
	return settings[key] === defaults[key];
}

export function encodeParams(settings: Settings) {
	const params = new URLSearchParams();
	for (const field of fields) {
		if (!field.visible) continue;
		const value = settings[field.key];
		if (value === field.default) continue;
		if (typeof value === 'boolean') params.set(field.urlKey, value ? '1' : '0');
		else if (field.kind === 'color') params.set(field.urlKey, String(value).replace(/^#/, ''));
		else params.set(field.urlKey, String(value));
	}
	return params;
}

export function decodeParams(params: URLSearchParams) {
	const out: Partial<Record<SettingKey, unknown>> = {};
	for (const field of fields) {
		const raw = params.get(field.urlKey);
		if (raw === null) continue;
		if (field.kind === 'toggle') {
			if (raw === '1' || raw === 'true') out[field.key] = true;
			else if (raw === '0' || raw === 'false') out[field.key] = false;
		} else if (field.kind === 'color') {
			out[field.key] = /^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(raw) ? `#${raw}` : raw;
		} else {
			out[field.key] = raw;
		}
	}
	return out;
}

export function hasUrlSettings(params: URLSearchParams) {
	return fields.some((f) => params.has(f.urlKey));
}
