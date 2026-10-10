import type { AnimatedIconHandle, AnimatedIconProps } from 'aliveicon';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { meta, type IconMeta } from './meta';
import { toWords } from './slug';

export type IconComponent = ForwardRefExoticComponent<
	AnimatedIconProps & RefAttributes<AnimatedIconHandle>
>;

export interface Icon extends IconMeta {
	flat: string;
	words: string[];
	target?: string;
}

const build = (
	name: string,
	slug: string,
	letter: string,
	isNew: boolean,
	target?: string
): Icon => ({
	name,
	slug,
	letter,
	isNew,
	flat: name.toLowerCase(),
	words: toWords(name),
	target,
});

const byName = (a: Icon, b: Icon) =>
	a.flat === b.flat ? (a.name < b.name ? -1 : 1) : a.flat < b.flat ? -1 : 1;

export const icons: Icon[] = meta.icons.map((i) => build(i.name, i.slug, i.letter, i.isNew));

const aliasIcons: Icon[] = meta.aliases.map((a) =>
	build(a.name, a.slug, a.name[0].toLowerCase(), false, a.target)
);

export const iconsWithAliases: Icon[] = [...icons, ...aliasIcons].sort(byName);
