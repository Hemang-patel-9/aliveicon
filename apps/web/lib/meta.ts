import raw from './generated/meta.json';

export interface IconMeta {
	name: string;
	slug: string;
	letter: string;
	isNew: boolean;
	block: string;
}

export interface AliasMeta {
	name: string;
	target: string;
	deprecated: boolean;
	slug: string;
	targetSlug: string;
	block: string;
}

export interface Meta {
	mode: 'src' | 'package';
	version: string;
	count: number;
	icons: IconMeta[];
	aliases: AliasMeta[];
}

export const meta = raw as Meta;
