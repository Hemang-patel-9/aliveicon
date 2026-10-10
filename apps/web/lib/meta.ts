import raw from './generated/meta.json';

export interface IconMeta {
	name: string;
	slug: string;
	letter: string;
	isNew: boolean;
}

export interface AliasMeta {
	name: string;
	target: string;
	slug: string;
	targetSlug: string;
}

export interface Meta {
	mode: 'src' | 'package';
	version: string;
	count: number;
	icons: IconMeta[];
	aliases: AliasMeta[];
}

export const meta = raw as Meta;
