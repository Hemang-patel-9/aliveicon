import type { MetadataRoute } from 'next';
import { siteRoot } from '@/lib/site-url';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';

const { site, theme } = siteConfig;

export default function manifest(): MetadataRoute.Manifest {
	const scope = new URL(siteRoot).pathname;
	return {
		name: site.name,
		short_name: site.name,
		description: site.description,
		start_url: scope,
		scope,
		display: 'browser',
		background_color: theme.colors.light.canvas,
		theme_color: theme.colors.light.canvas,
		icons: [
			{ src: `${scope}icon.svg`, sizes: 'any', type: 'image/svg+xml' },
			{ src: `${scope}apple-icon.png`, sizes: '180x180', type: 'image/png' },
		],
	};
}
