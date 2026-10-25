import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { fontClassNames } from '@/lib/fonts';
import { buildThemeCss, buildThemeScript } from '@/lib/theme';
import { siteConfig } from '@/site.config';
import './globals.css';

const { site, theme } = siteConfig;

export const metadata: Metadata = {
	metadataBase: new URL(`${site.url}${site.basePath}/`),
	title: { default: `${site.name}: animated icons for React`, template: `%s | ${site.name}` },
	description: site.description,
	applicationName: site.name,
	openGraph: {
		title: site.name,
		description: site.tagline,
		siteName: site.name,
		type: 'website',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={fontClassNames(theme.fonts)} suppressHydrationWarning>
			<head>
				<style dangerouslySetInnerHTML={{ __html: buildThemeCss(siteConfig) }} />
				<script dangerouslySetInnerHTML={{ __html: buildThemeScript(siteConfig) }} />
			</head>
			<body className="flex min-h-dvh flex-col">
				<a className="skip-link" href="#main-content">
					Skip to main content
				</a>
				<Header />
				<main id="main-content" className="flex-1">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
