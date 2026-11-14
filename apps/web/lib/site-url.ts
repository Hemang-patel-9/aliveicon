import { siteConfig } from '@/site.config';

const origin = (process.env.SITE_URL ?? siteConfig.site.url).replace(/\/+$/, '');
const basePath = process.env.SITE_BASE_PATH ?? siteConfig.site.basePath;

export const siteRoot = `${origin}${basePath}/`;

export const absoluteUrl = (path = '') => new URL(path.replace(/^\/+/, ''), siteRoot).toString();
