'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const slashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const CartonOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10 10H5v10a2 2 0 002 2h10a2 2 0 002-2v-1" />
					<path d="M13 22v-9" />
					<path d="M13.902 8.245 16 6h-4.343" />
					<path d="M19 13.343V10a2 2 0 00-.539-1.367L16 6V3a1 1 0 00-1-1H9a1 1 0 00-.857.486" />
					<motion.path
						d="m2 2 20 20"
						variants={slashVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M7.034 7.034 5.539 8.633A2 2 0 005 10" />
				</svg>
			</div>
		);
	}
);

CartonOff.displayName = 'CartonOff';

export { CartonOff };
