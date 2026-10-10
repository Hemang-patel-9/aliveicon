'use client';

import { Activity, type AnimatedIconHandle } from 'aliveicon';
import Link from 'next/link';
import { useRef } from 'react';

export function Wordmark({ name }: { name: string }) {
	const icon = useRef<AnimatedIconHandle>(null);

	return (
		<Link
			href="/"
			aria-label={`${name} home`}
			onMouseEnter={() => icon.current?.startAnimation()}
			onMouseLeave={() => icon.current?.stopAnimation()}
			onFocus={() => icon.current?.startAnimation()}
			onBlur={() => icon.current?.stopAnimation()}
			className="rounded-sm text-text flex items-center gap-2 font-medium tracking-tight"
		>
			<Activity ref={icon} size={20} className="inline-flex" />
			<span className="text-lg">{name}</span>
		</Link>
	);
}
