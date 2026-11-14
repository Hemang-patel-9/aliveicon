import { GeistSans } from 'geist/font/sans';
import localFont from 'next/font/local';
import type { ThemeConfig } from './config';

const GeistMono = localFont({
	src: '../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2',
	variable: '--font-geist-mono',
	weight: '100 900',
	adjustFontFallback: false,
	preload: false,
});

export function fontClassNames(fonts: ThemeConfig['fonts']) {
	return [
		fonts.sans === 'geist' ? GeistSans.variable : '',
		fonts.mono === 'geist' ? GeistMono.variable : '',
	]
		.filter(Boolean)
		.join(' ');
}
