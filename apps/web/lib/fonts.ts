import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { ThemeConfig } from './config';

export function fontClassNames(fonts: ThemeConfig['fonts']) {
	return [
		fonts.sans === 'geist' ? GeistSans.variable : '',
		fonts.mono === 'geist' ? GeistMono.variable : '',
	]
		.filter(Boolean)
		.join(' ');
}
