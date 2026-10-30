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

const bottomVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const topVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TableRowsSplit = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M14 10h2"
						variants={drawVariants}
						custom={[0.26, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.g variants={bottomVariants} initial="normal" animate={controls}>
						<path d="M15 22v-8" />
						<path d="M3 19h18" />
						<path d="M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6" />
						<path d="M9 22v-8" />
					</motion.g>
					<motion.g variants={topVariants} initial="normal" animate={controls}>
						<path d="M15 2v4" />
						<path d="M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2" />
						<path d="M9 2v4" />
					</motion.g>
					<motion.path
						d="M2 10h2"
						variants={drawVariants}
						custom={[0.1, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 10h2"
						variants={drawVariants}
						custom={[0.34, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 10h2"
						variants={drawVariants}
						custom={[0.18, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TableRowsSplit.displayName = 'TableRowsSplit';

export { TableRowsSplit };
