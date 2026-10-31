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

const FileChartColumn = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
					<path d="M14 2v5a1 1 0 0 0 1 1h5" />
					<motion.path
						d="M8 18v-1"
						variants={drawVariants}
						custom={[0, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 18v-6"
						variants={drawVariants}
						custom={[0.1, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 18v-3"
						variants={drawVariants}
						custom={[0.2, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FileChartColumn.displayName = 'FileChartColumn';

export { FileChartColumn };
