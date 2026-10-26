'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swingVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 3, -1.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const puckVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1.5, 0],
		transition: { duration: 0.4, delay: 0.25, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, delay, ease: 'easeInOut' },
	}),
};

const HockeyStick = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={puckVariants} initial="normal" animate={controls}>
						<path d="M11 4v4c0 1.1-2.025 2-4.5 2S2 9.1 2 8V4" />
						<ellipse cx="6.5" cy="4" rx="4.5" ry="2" />
					</motion.g>
					<motion.g
						variants={swingVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '100%', originY: '0%' }}
					>
						<path d="M18.21 3.106a2 2 0 013.579 1.789l-6.895 13.789A6 6 0 019.529 22H4.5a1 1 0 010-5h5.528a2 2 0 001.788-1.105z" />
						<motion.path
							d="m18.59 11.295-3.578-1.789"
							variants={drawVariants}
							custom={0.2}
							initial="normal"
							animate={controls}
						/>
						<motion.path
							d="m20.79 6.895-3.578-1.789"
							variants={drawVariants}
							custom={0.1}
							initial="normal"
							animate={controls}
						/>
						<path d="M7 17v5" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

HockeyStick.displayName = 'HockeyStick';

export { HockeyStick };
