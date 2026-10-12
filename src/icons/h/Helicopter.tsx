'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const edgeVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 0.3, 1, 0.3, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Helicopter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
				>
					<path d="M11 17v4" />
					<path d="M14 3v8a2 2 0 0 0 2 2h5.865" />
					<path d="M17 17v4" />
					<path d="M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z" />
					<path d="M2 10v5" />
					<motion.path d="M6 3h16" variants={edgeVariants} initial="normal" animate={controls} />
					<path d="M7 21h14" />
					<path d="M8 13H2" />
				</svg>
			</div>
		);
	}
);

Helicopter.displayName = 'Helicopter';

export { Helicopter };
