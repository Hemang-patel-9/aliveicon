import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { fontClassNames } from '@/lib/fonts';
import { siteRoot } from '@/lib/site-url';
import { buildThemeCss, buildThemeScript } from '@/lib/theme';
import { siteConfig } from '@/site.config';
import './globals.css';

const { site, theme } = siteConfig;

export const metadata: Metadata = {
	metadataBase: new URL(siteRoot),
	title: { default: `${site.name}: animated icons for React`, template: `%s | ${site.name}` },
	description: site.description,
	applicationName: site.name,
	alternates: { canonical: './' },
	openGraph: {
		title: site.name,
		description: site.tagline,
		siteName: site.name,
		url: './',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: site.name,
		description: site.tagline,
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: theme.colors.light.canvas },
		{ media: '(prefers-color-scheme: dark)', color: theme.colors.dark.canvas },
	],
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
