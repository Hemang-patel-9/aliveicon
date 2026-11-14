const base = new URL(process.argv[2] ?? process.env.SITE_URL ?? '');
if (!base.protocol.startsWith('http')) {
	console.error('usage: node scripts/smoke.mjs <site url>');
	process.exit(1);
}
if (!base.pathname.endsWith('/')) base.pathname += '/';

const attempts = Number(process.env.SMOKE_ATTEMPTS ?? 5);
const waitMs = Number(process.env.SMOKE_WAIT_MS ?? 15_000);
const at = (path) => new URL(path, base).toString();
const get = (path, init) =>
	fetch(at(path), { redirect: 'manual', signal: AbortSignal.timeout(20_000), ...init });

const checks = [
	async () => {
		const res = await get('');
		const html = await res.text();
		const h = (name) => res.headers.get(name) ?? '';
		const asset = html.match(/\/_next\/static\/[^"']+\.js/)?.[0];
		return [
			['home returns 200', res.status === 200],
			['home is HTML', h('content-type').includes('text/html')],
			['canonical points at the site', html.includes(`rel="canonical" href="${base}"`)],
			['CSP blocks framing', /frame-ancestors 'none'/.test(h('content-security-policy'))],
			['CSP blocks plugins', /object-src 'none'/.test(h('content-security-policy'))],
			[
				'HSTS covers subdomains',
				/max-age=\d{7,}; includeSubDomains/.test(h('strict-transport-security')),
			],
			['nosniff', h('x-content-type-options') === 'nosniff'],
			['X-Frame-Options DENY', h('x-frame-options') === 'DENY'],
			['CORP same-origin', h('cross-origin-resource-policy') === 'same-origin'],
			['Referrer-Policy', h('referrer-policy') === 'strict-origin-when-cross-origin'],
			['page links a script chunk', Boolean(asset)],
			...(asset ? await assetChecks(asset) : []),
		];
	},
	async () => {
		const res = await get('robots.txt');
		const body = await res.text();
		return [
			['robots.txt lists the sitemap', res.ok && body.includes(`Sitemap: ${at('sitemap.xml')}`)],
		];
	},
	async () => {
		const res = await get('sitemap.xml');
		const body = await res.text();
		return [['sitemap.xml lists the home page', res.ok && body.includes(`<loc>${base}</loc>`)]];
	},
	async () => {
		const res = await get('.well-known/security.txt');
		const body = await res.text();
		const expires = Date.parse(body.match(/^Expires: (.+)$/m)?.[1] ?? '');
		const days = (expires - Date.now()) / 86_400_000;
		return [
			['security.txt has a contact', res.ok && /^Contact: https:\/\//m.test(body)],
			['security.txt expires in 30+ days', days > 30],
		];
	},
	async () => {
		const results = [];
		for (const path of ['favicon.ico', 'icon.svg', 'apple-icon.png', 'opengraph-image.png']) {
			const res = await get(path);
			results.push([`${path} returns 200`, res.status === 200]);
		}
		return results;
	},
	async () => {
		const res = await get('this-page-does-not-exist/');
		return [['unknown pages return 404', res.status === 404]];
	},
	async () => {
		if (base.protocol !== 'https:' || base.hostname === 'localhost') return [];
		const plain = new URL(base);
		plain.protocol = 'http:';
		const res = await fetch(plain, { redirect: 'manual', signal: AbortSignal.timeout(20_000) });
		const location = res.headers.get('location') ?? '';
		return [
			[
				'http redirects to https',
				[301, 308].includes(res.status) && location.startsWith('https://'),
			],
		];
	},
];

async function assetChecks(path) {
	const res = await get(path);
	return [
		['script chunk returns 200', res.status === 200],
		['script chunk is cached immutably', /immutable/.test(res.headers.get('cache-control') ?? '')],
	];
}

async function run() {
	const results = [];
	for (const check of checks) {
		try {
			results.push(...(await check()));
		} catch (error) {
			results.push([`request failed: ${error.message}`, false]);
		}
	}
	return results;
}

for (let attempt = 1; attempt <= attempts; attempt++) {
	const results = await run();
	const failed = results.filter(([, ok]) => !ok);
	if (failed.length === 0 || attempt === attempts) {
		for (const [name, ok] of results) console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}`);
		console.log(`\n${results.length - failed.length}/${results.length} checks passed for ${base}`);
		process.exit(failed.length === 0 ? 0 : 1);
	}
	console.log(`attempt ${attempt}: ${failed.length} failing, retrying in ${waitMs / 1000}s`);
	await new Promise((resolve) => setTimeout(resolve, waitMs));
}
