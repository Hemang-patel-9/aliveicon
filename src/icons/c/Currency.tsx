'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const coinVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.9, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const tickVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([dx, dy, i]: [number, number, number]) => ({
		x: [dx, 0],
		y: [dy, 0],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const Currency = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="12"
						cy="12"
						r="8"
						style={{ originX: '50%', originY: '50%' }}
						variants={coinVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="3"
						x2="6"
						y1="3"
						y2="6"
						custom={[1, 1, 0]}
						variants={tickVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="21"
						x2="18"
						y1="3"
						y2="6"
						custom={[-1, 1, 1]}
						variants={tickVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="3"
						x2="6"
						y1="21"
						y2="18"
						custom={[1, -1, 2]}
						variants={tickVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="21"
						x2="18"
						y1="21"
						y2="18"
						custom={[-1, -1, 3]}
						variants={tickVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Currency.displayName = 'Currency';

export { Currency };
