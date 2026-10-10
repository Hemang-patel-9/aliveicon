interface Searchable {
	name: string;
	flat: string;
	words: string[];
}

const SPLIT = /[^a-z0-9]+/;

export function tokenize(query: string) {
	return query.toLowerCase().split(SPLIT).filter(Boolean);
}

function score(item: Searchable, tokens: string[]) {
	const joined = tokens.join('');
	if (item.flat === joined) return 0;
	if (item.flat.startsWith(joined)) return 1;
	const starts = tokens.every((token, i) => item.words[i]?.startsWith(token));
	if (starts) return 2;
	const prefixes = tokens.every((token) => item.words.some((word) => word.startsWith(token)));
	return prefixes ? 3 : 4;
}

export function searchItems<T extends Searchable>(items: T[], query: string): T[] {
	const tokens = tokenize(query);
	if (tokens.length === 0) return items;

	const matches: { item: T; rank: number }[] = [];
	for (const item of items) {
		if (!tokens.every((token) => item.flat.includes(token))) continue;
		matches.push({ item, rank: score(item, tokens) });
	}
	matches.sort((a, b) => a.rank - b.rank);
	return matches.map((m) => m.item);
}
