import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { contrast, validateConfig, type SiteConfig } from '@/lib/config';
import { searchItems, tokenize } from '@/lib/search';
import {
	decodeParams,
	defaults,
	encodeParams,
	fields,
	matchesDefaults,
	sanitize,
	sanitizeAll,
	type Settings,
} from '@/lib/settings/schema';
import { copySnippet, importSnippet, jsxSnippet } from '@/lib/snippets';
import { toSlug, toWords } from '@/lib/slug';
import { siteConfig } from '@/site.config';

const meta = JSON.parse(
	fs.readFileSync(path.join(import.meta.dirname, '../lib/generated/meta.json'), 'utf8')
) as { icons: { name: string; slug: string }[] };

const clone = () => structuredClone(siteConfig) as unknown as SiteConfig;

test.describe('config validation', () => {
	test('the shipped config is valid', () => {
		expect(validateConfig(siteConfig)).toEqual([]);
	});

	test('contrast matches the WCAG reference values', () => {
		expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 1);
		expect(contrast('#777777', '#777777')).toBe(1);
	});

	test('rejects a default outside its range', () => {
		const config = clone();
		config.gallery.iconSize.default = 500;
		expect(validateConfig(config).join('\n')).toContain('gallery.iconSize.default');
	});

	test('rejects min above max', () => {
		const config = clone();
		config.gallery.gap.min = 50;
		expect(validateConfig(config).join('\n')).toContain('gallery.gap');
	});

	test('rejects a color that is not hex', () => {
		const config = clone();
		config.theme.colors.light.canvas = 'white';
		expect(validateConfig(config).join('\n')).toContain('not a hex color');
	});

	test('rejects alpha colors outside the overlay token', () => {
		const config = clone();
		config.theme.colors.light.text = '#00000080';
		expect(validateConfig(config).join('\n')).toContain('theme.colors.light.text');
	});

	test('rejects text with too little contrast', () => {
		const config = clone();
		config.theme.colors.light.textMuted = '#dddddd';
		expect(validateConfig(config).join('\n')).toContain('textMuted on canvas');
	});

	test('rejects an option default that is not an option', () => {
		const config = clone();
		(config.gallery.tileStyle as { default: string }).default = 'sparkly';
		expect(validateConfig(config).join('\n')).toContain('gallery.tileStyle.default');
	});

	test('rejects a base path with a trailing slash', () => {
		const config = clone();
		config.site.basePath = '/aliveicon/';
		expect(validateConfig(config).join('\n')).toContain('basePath');
	});

	test('rejects breakpoints in the wrong order', () => {
		const config = clone();
		config.theme.layout.breakpoints = { phone: 1000, tablet: 600 };
		expect(validateConfig(config).join('\n')).toContain('breakpoints');
	});
});

test.describe('slugs', () => {
	test('match the Lucide style', () => {
		expect(toSlug('ArrowUp01')).toBe('arrow-up-0-1');
		expect(toSlug('ArrowDown10')).toBe('arrow-down-1-0');
		expect(toSlug('Axis3d')).toBe('axis-3d');
		expect(toSlug('ALargeSmall')).toBe('a-large-small');
		expect(toSlug('ArrowUpAZ')).toBe('arrow-up-a-z');
		expect(toWords('AlarmClockCheck')).toEqual(['alarm', 'clock', 'check']);
	});

	test('every icon has a unique slug that matches the generated one', () => {
		const seen = new Set<string>();
		for (const icon of meta.icons) {
			expect(toSlug(icon.name), icon.name).toBe(icon.slug);
			expect(seen.has(icon.slug), `duplicate ${icon.slug}`).toBe(false);
			seen.add(icon.slug);
		}
	});
});

test.describe('settings schema', () => {
	test('defaults come from the config', () => {
		expect(defaults.iconSize).toBe(siteConfig.gallery.iconSize.default);
		expect(defaults.tileStyle).toBe(siteConfig.gallery.tileStyle.default);
		expect(defaults.colsDesktop).toBe(siteConfig.gallery.columns.fixed.desktop.default);
		expect(matchesDefaults(defaults)).toBe(true);
	});

	test('url keys are unique', () => {
		const keys = fields.map((f) => f.urlKey);
		expect(new Set(keys).size).toBe(keys.length);
	});

	test('numbers are clamped and snapped to the step', () => {
		expect(sanitize('iconSize', 500)).toBe(128);
		expect(sanitize('iconSize', 1)).toBe(12);
		expect(sanitize('iconSize', 33)).toBe(34);
		expect(sanitize('iconSize', 'abc')).toBe(defaults.iconSize);
		expect(sanitize('iconSize', NaN)).toBe(defaults.iconSize);
		expect(sanitize('tileAspect', 1.07)).toBe(1.05);
		expect(sanitize('colsDesktop', 0)).toBe(1);
	});

	test('options outside the allowed set fall back to the default', () => {
		expect(sanitize('tileStyle', 'minimal')).toBe('minimal');
		expect(sanitize('tileStyle', 'sparkly')).toBe(defaults.tileStyle);
		expect(sanitize('tileStyle', 3)).toBe(defaults.tileStyle);
	});

	test('toggles accept only booleans', () => {
		expect(sanitize('showNames', false)).toBe(false);
		expect(sanitize('showNames', 'yes')).toBe(defaults.showNames);
	});

	test('colors accept presets and hex only', () => {
		expect(sanitize('iconColor', 'theme')).toBe('theme');
		expect(sanitize('iconColor', '#FF0000')).toBe('#ff0000');
		expect(sanitize('iconColor', '#abc')).toBe('#abc');
		expect(sanitize('iconColor', 'red')).toBe('theme');
		expect(sanitize('iconColor', 'javascript:alert(1)')).toBe('theme');
	});

	test('hidden settings stay locked to their default', () => {
		expect(sanitize('clickAction', 'drawer')).toBe(defaults.clickAction);
	});

	test('sanitizeAll ignores unknown keys and bad values', () => {
		const result = sanitizeAll({ iconSize: 40, nonsense: 1, gap: 'x' } as never);
		expect(result.iconSize).toBe(40);
		expect(result.gap).toBe(defaults.gap);
		expect('nonsense' in result).toBe(false);
	});

	test('the url only carries non-default values and round-trips', () => {
		expect(encodeParams(defaults).toString()).toBe('');

		const changed: Settings = {
			...defaults,
			iconSize: 48,
			iconColor: '#ff0000',
			columnsMode: 'fixed',
			colsDesktop: 6,
			tileStyle: 'hairline',
			showNames: false,
			loopOnHover: true,
			gap: 12,
		};
		const params = encodeParams(changed);
		expect(params.get('size')).toBe('48');
		expect(params.get('color')).toBe('ff0000');
		expect(params.get('names')).toBe('0');
		expect(params.has('tw')).toBe(false);
		expect(sanitizeAll(decodeParams(params))).toEqual(changed);
	});

	test('hostile url values are sanitized', () => {
		const params = new URLSearchParams('size=9999&style=<script>&color=zzz&names=maybe&c3=-4');
		const result = sanitizeAll(decodeParams(params));
		expect(result.iconSize).toBe(128);
		expect(result.tileStyle).toBe(defaults.tileStyle);
		expect(result.iconColor).toBe(defaults.iconColor);
		expect(result.showNames).toBe(defaults.showNames);
	});
});

const items = [
	'ArrowUp',
	'ArrowUpRight',
	'ArrowDownUp',
	'Arrow',
	'ArrowBigUp',
	'Bell',
	'BellRing',
].map((name) => ({ name, flat: name.toLowerCase(), words: toWords(name) }));

test.describe('search', () => {
	test('tokenizes on any separator', () => {
		expect(tokenize('Arrow-Up_01')).toEqual(['arrow', 'up', '01']);
		expect(tokenize('   ')).toEqual([]);
	});

	test('an empty query returns everything untouched', () => {
		expect(searchItems(items, '')).toBe(items);
	});

	test('matches words, joined words and kebab input', () => {
		const names = (q: string) => searchItems(items, q).map((i) => i.name);
		expect(names('arrow up')).toEqual(expect.arrayContaining(['ArrowUp', 'ArrowUpRight']));
		expect(names('arrowup')).toEqual(expect.arrayContaining(['ArrowUp', 'ArrowUpRight']));
		expect(names('arrow-up')).toEqual(expect.arrayContaining(['ArrowUp', 'ArrowUpRight']));
		expect(names('bell')).toEqual(['Bell', 'BellRing']);
	});

	test('ranks an exact name first, then prefixes', () => {
		const names = searchItems(items, 'arrowup').map((i) => i.name);
		expect(names[0]).toBe('ArrowUp');
		expect(names[1]).toBe('ArrowUpRight');
	});

	test('returns nothing for a miss', () => {
		expect(searchItems(items, 'zzzz')).toEqual([]);
	});
});

test.describe('copy snippets', () => {
	test('import line', () => {
		expect(importSnippet('Anvil')).toBe("import { Anvil } from 'aliveicon';");
	});

	test('jsx lists only non-default props', () => {
		expect(jsxSnippet('Anvil', { ...defaults, iconSize: 28 })).toBe('<Anvil />');
		expect(jsxSnippet('Anvil', { ...defaults, iconSize: 40 })).toBe('<Anvil size={40} />');
		expect(
			jsxSnippet('Anvil', {
				...defaults,
				iconSize: 28,
				iconColor: '#ff0000',
				hoverable: false,
				loopOnHover: true,
				animateOnClick: true,
				autoAnimateOnLoad: true,
			})
		).toBe(
			"<Anvil style={{ color: '#ff0000' }} hoverable={false} loopOnHover animateOnClick autoAnimateOnLoad />"
		);
	});

	test('copy format picks the right text', () => {
		expect(copySnippet('Anvil', { ...defaults, copyFormat: 'name' })).toBe('Anvil');
		expect(copySnippet('Anvil', { ...defaults, copyFormat: 'import' })).toBe(
			"import { Anvil } from 'aliveicon';"
		);
		expect(copySnippet('Anvil', { ...defaults, copyFormat: 'jsx' })).toContain('<Anvil');
	});
});
