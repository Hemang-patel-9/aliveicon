'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const turn45Variants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 45],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const BrainCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={turn45Variants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="m10.852 14.772-.383.923" />
						<path d="m10.852 9.228-.383-.923" />
						<path d="m13.148 14.772.382.924" />
						<path d="m13.531 8.305-.383.923" />
						<path d="m14.772 10.852.923-.383" />
						<path d="m14.772 13.148.923.383" />
						<path d="m9.228 10.852-.923-.383" />
						<path d="m9.228 13.148-.923.383" />
						<circle cx="12" cy="12" r="3" />
					</motion.g>
					<motion.path
						d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M17.998 5.125a4 4 0 0 1 2.525 5.771"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M19.505 10.294a4 4 0 0 1-1.5 7.706"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="M4.5 10.291A4 4 0 0 0 6 18"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
					<motion.path
						d="M6.002 5.125a3 3 0 0 0 .4 1.375"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
				</svg>
			</div>
		);
	}
);

BrainCog.displayName = 'BrainCog';

export { BrainCog };
