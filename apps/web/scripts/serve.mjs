import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import zlib from 'node:zlib';
import { siteConfig } from '../site.config.ts';

const appDir = path.resolve(import.meta.dirname, '..');
const outDir = path.join(appDir, 'out');
const basePath = process.env.SITE_BASE_PATH ?? siteConfig.site.basePath;
const port = Number(process.env.PORT ?? 3000);

const types = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.txt': 'text/plain; charset=utf-8',
	'.xml': 'application/xml; charset=utf-8',
	'.woff2': 'font/woff2',
	'.png': 'image/png',
	'.ico': 'image/x-icon',
};

const cache = new Map();

const isWithin = (root, target) => {
	const relative = path.relative(root, target);
	return (
		relative === '' ||
		(!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
	);
};

const encode = (file, encoding) => {
	const key = `${file}:${encoding}`;
	const hit = cache.get(key);
	if (hit) return hit;
	const raw = fs.readFileSync(file);
	let body = raw;
	if (encoding === 'br') {
		body = zlib.brotliCompressSync(raw, {
			params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 6 },
		});
	} else if (encoding === 'gzip') {
		body = zlib.gzipSync(raw, { level: 6 });
	}
	cache.set(key, body);
	return body;
};

const resolveFile = (pathname) => {
	if (!fs.existsSync(outDir)) return null;
	const root = fs.realpathSync(outDir);
	const target = path.resolve(root, `.${pathname}`);
	if (!isWithin(root, target)) return null;
	for (const candidate of [target, path.join(target, 'index.html'), `${target}.html`]) {
		if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) continue;
		const resolved = fs.realpathSync(candidate);
		if (isWithin(root, resolved)) return resolved;
	}
	return null;
};

http
	.createServer((req, res) => {
		let pathname;
		try {
			pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
		} catch {
			res.writeHead(400).end('bad request');
			return;
		}
		if (basePath) {
			if (pathname === basePath) {
				res.writeHead(308, { Location: `${basePath}/` }).end();
				return;
			}
			if (!pathname.startsWith(`${basePath}/`)) {
				res.writeHead(404).end('not found');
				return;
			}
			pathname = pathname.slice(basePath.length);
		}
		const file = resolveFile(pathname);
		if (!file) {
			const notFound = path.join(outDir, '404.html');
			res.writeHead(404, { 'Content-Type': types['.html'] });
			res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'not found');
			return;
		}
		const type = types[path.extname(file)] ?? 'application/octet-stream';
		const accept = String(req.headers['accept-encoding'] ?? '');
		const compressible = new RegExp('^(text/|application/(json|xml)|image/svg)').test(type);
		const encoding = !compressible
			? null
			: accept.includes('br')
				? 'br'
				: accept.includes('gzip')
					? 'gzip'
					: null;
		const headers = { 'Content-Type': type };
		if (encoding) {
			headers['Content-Encoding'] = encoding;
			headers.Vary = 'Accept-Encoding';
		}
		res.writeHead(200, headers);
		res.end(encode(file, encoding));
	})
	.listen(port, () => {
		console.log(`serving out/ at http://localhost:${port}${basePath}/`);
	});
