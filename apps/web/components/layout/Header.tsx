import Link from 'next/link';
import { siteConfig } from '@/site.config';
import { ArrowUpRightGlyph } from '@/components/ui/glyphs';
import { ThemeToggle } from './ThemeToggle';
import { Wordmark } from './Wordmark';

export function Header() {
	const { site, theme } = siteConfig;

	return (
		<header className="border-b-hair bg-canvas sticky top-0 z-30 h-(--header-h)">
			<div className="mx-auto flex h-full max-w-(--content-max) items-center gap-6 px-4 sm:px-6">
				<Wordmark name={site.name} />
				<nav aria-label="Primary" className="flex flex-1 items-center gap-1">
					{site.nav.map((item) =>
						item.external ? (
							<a
								key={item.label}
								href={item.href}
								target="_blank"
								rel="noreferrer"
								className="text-muted hover:text-text rounded-sm duration-fast hidden items-center gap-1 px-2 py-1 text-sm transition-colors sm:inline-flex"
							>
								{item.label}
								<ArrowUpRightGlyph width={12} height={12} />
							</a>
						) : (
							<Link
								key={item.label}
								href={item.href}
								className="text-muted hover:text-text rounded-sm duration-fast px-2 py-1 text-sm transition-colors"
							>
								{item.label}
							</Link>
						)
					)}
				</nav>
				<ThemeToggle defaultChoice={theme.modes.default} allowSystem={theme.modes.allowSystem} />
			</div>
		</header>
	);
}
