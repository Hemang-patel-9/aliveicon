import type { MetadataRoute } from 'next';
import { siteRoot } from '@/lib/site-url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: siteRoot, lastModified: new Date() }];
}
