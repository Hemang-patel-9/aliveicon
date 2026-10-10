const TOKEN = /[A-Z][a-z]*|\d[a-z]*|[a-z]+/g;

export function toSlug(name: string) {
	return (name.match(TOKEN) ?? [name]).join('-').toLowerCase();
}

export function toWords(name: string) {
	return (name.match(TOKEN) ?? [name]).map((w) => w.toLowerCase());
}
