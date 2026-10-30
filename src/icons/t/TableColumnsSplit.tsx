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

const leftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const rightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TableColumnsSplit = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M14 14v2"
						variants={drawVariants}
						custom={[0.26, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 20v2"
						variants={drawVariants}
						custom={[0.34, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 2v2"
						variants={drawVariants}
						custom={[0.1, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 8v2"
						variants={drawVariants}
						custom={[0.18, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.g variants={leftVariants} initial="normal" animate={controls}>
						<path d="M2 15h8" />
						<path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2" />
						<path d="M2 9h8" />
						<path d="M5 3v18" />
					</motion.g>
					<motion.g variants={rightVariants} initial="normal" animate={controls}>
						<path d="M22 15h-4" />
						<path d="M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
						<path d="M22 9h-4" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

TableColumnsSplit.displayName = 'TableColumnsSplit';

export { TableColumnsSplit };
