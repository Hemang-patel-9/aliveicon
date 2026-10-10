import { siteConfig } from '@/site.config';
import { ModeBadge } from './ModeBadge';

export function Footer() {
	const { site, features } = siteConfig;

	return (
		<footer className="border-t-hair bg-surface mt-24">
			<div className="mx-auto grid max-w-(--content-max) gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto]">
				<div className="flex flex-col gap-3">
					<p className="text-text text-sm font-medium">{site.name}</p>
					<p className="text-muted max-w-md text-sm">{site.tagline}</p>
					<p className="text-subtle text-xs">{site.footer.credit}</p>
					<p className="text-subtle text-xs">{site.footer.license}</p>
					{features.modeBadge ? (
						<div className="pt-2">
							<ModeBadge />
						</div>
					) : null}
				</div>
				<div className="flex gap-16">
					{site.footer.columns.map((column) => (
						<nav key={column.title} aria-label={column.title} className="flex flex-col gap-2">
							<p className="text-text text-xs font-medium">{column.title}</p>
							{column.links.map((link) => (
								<a
									key={link.label}
									href={link.href}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noreferrer' : undefined}
									className="text-muted hover:text-text rounded-sm duration-fast text-sm transition-colors"
								>
									{link.label}
								</a>
							))}
						</nav>
					))}
				</div>
			</div>
		</footer>
	);
}
