'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const PhilippinePeso = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M4 12h16"
						variants={drawVariants}
						custom={[0.4, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 8h16"
						variants={drawVariants}
						custom={[0.3, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 20V5a1 1 0 011-1h5a6 6 0 010 12H6"
						variants={drawVariants}
						custom={[0, 0, 0.55]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PhilippinePeso.displayName = 'PhilippinePeso';

export { PhilippinePeso };
