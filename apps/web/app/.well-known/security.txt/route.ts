import { absoluteUrl } from '@/lib/site-url';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';

const { repoUrl } = siteConfig.site;
const yearMs = 365 * 24 * 60 * 60 * 1000;

export function GET() {
	const expires = new Date(Date.now() + yearMs);
	expires.setUTCHours(0, 0, 0, 0);
	const body = [
		`Contact: ${repoUrl}/security/advisories/new`,
		`Expires: ${expires.toISOString()}`,
		`Policy: ${repoUrl}/blob/main/SECURITY.md`,
		`Canonical: ${absoluteUrl('.well-known/security.txt')}`,
		'Preferred-Languages: en',
		'',
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
