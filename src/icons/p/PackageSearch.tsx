'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const stampVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.94, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const scanVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.2, 0.6, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const PackageSearch = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={stampVariants} initial="normal" animate={controls}>
						<path d="M12 22V12" />
						<path d="M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559" />
						<path d="M3.29 7 12 12l8.71-5" />
						<path d="m7.5 4.27 8.997 5.148" />
					</motion.g>
					<motion.g variants={scanVariants} initial="normal" animate={controls}>
						<path d="M20.27 18.27 22 20" />
						<circle cx="18.5" cy="16.5" r="2.5" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

PackageSearch.displayName = 'PackageSearch';

export { PackageSearch };
