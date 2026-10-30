'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const curtainLeftVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 0.8, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const curtainRightVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 0.8, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const Theater = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={curtainLeftVariants}
						style={{ originX: '0%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M2 10s3-3 3-8" />
						<path d="M10 2c0 4.4-3.6 8-8 8" />
						<path d="M2 10s2 2 2 5" />
					</motion.g>
					<motion.g
						variants={curtainRightVariants}
						style={{ originX: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M22 10s-3-3-3-8" />
						<path d="M14 2c0 4.4 3.6 8 8 8" />
						<path d="M22 10s-2 2-2 5" />
					</motion.g>
					<motion.path
						d="M8 15h8"
						variants={drawVariants}
						custom={[0.2, 0.5, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<path d="M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
					<path d="M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
				</svg>
			</div>
		);
	}
);

Theater.displayName = 'Theater';

export { Theater };
