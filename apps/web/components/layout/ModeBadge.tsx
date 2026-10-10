import { meta } from '@/lib/meta';

export function ModeBadge() {
	const label = meta.mode === 'src' ? `source ${meta.version}` : `package ${meta.version}`;

	return (
		<span
			title={
				meta.mode === 'src'
					? 'Icons are loaded from the library source in this repository'
					: 'Icons are loaded from the aliveicon npm package'
			}
			className="border-hair rounded-sm text-subtle font-mono inline-flex h-6 items-center px-2 text-xs"
		>
			{label}
		</span>
	);
}
