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

const lidVariants: Variants = {
	normal: { rotate: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -12, 0],
		y: [0, -1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TrashOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.path
						d="M10 11v6"
						variants={drawVariants}
						custom={[0.2, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 17v-3"
						variants={drawVariants}
						custom={[0.3, 1, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.g
						variants={lidVariants}
						style={{ originX: '0%', originY: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-1.576.768" />
						<path d="M21 6h-9.344" />
						<path d="M3 6h3" />
					</motion.g>
					<path d="M19 6v7.344" />
					<motion.path
						d="m2 2 20 20"
						variants={drawVariants}
						custom={[0.45, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<path d="M5 6v14a2 2 0 002 2h10a2 2 0 002-2v-1" />
				</svg>
			</div>
		);
	}
);

TrashOff.displayName = 'TrashOff';

export { TrashOff };
