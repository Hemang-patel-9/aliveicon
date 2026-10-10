import path from 'node:path';
import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import { assertConfig } from './lib/config';
import { siteConfig } from './site.config';

assertConfig(siteConfig);

const appDir = import.meta.dirname;
const repoRoot = path.resolve(appDir, '../..');
const fromSource = process.env.ALIVEICON_MODE === 'src';
const basePath = process.env.SITE_BASE_PATH ?? siteConfig.site.basePath;

export default function nextConfig(phase: string): NextConfig {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;

	return {
		output: isDev ? undefined : 'export',
		trailingSlash: true,
		basePath: basePath || undefined,
		images: { unoptimized: true },
		reactStrictMode: true,
		poweredByHeader: false,
		agentRules: false,
		experimental: { optimizePackageImports: ['aliveicon'] },
		turbopack: fromSource
			? { root: repoRoot, resolveAlias: { aliveicon: '../../src/index.ts' } }
			: { root: appDir },
	};
}
