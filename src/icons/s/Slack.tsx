'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const directions: [number, number][] = [
	[1, -1],
	[-1, 1],
	[1, 1],
	[-1, -1],
];

const snapVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		x: [0, directions[i][0] * 1.5, 0],
		y: [0, directions[i][1] * 1.5, 0],
		transition: { duration: 0.5, delay: i * 0.06, ease: 'easeInOut' },
	}),
};

const Slack = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={snapVariants} custom={0} initial="normal" animate={controls}>
						<rect width="3" height="8" x="13" y="2" rx="1.5" />
						<path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
					</motion.g>
					<motion.g variants={snapVariants} custom={1} initial="normal" animate={controls}>
						<rect width="3" height="8" x="8" y="14" rx="1.5" />
						<path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
					</motion.g>
					<motion.g variants={snapVariants} custom={2} initial="normal" animate={controls}>
						<rect width="8" height="3" x="14" y="13" rx="1.5" />
						<path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
					</motion.g>
					<motion.g variants={snapVariants} custom={3} initial="normal" animate={controls}>
						<rect width="8" height="3" x="2" y="8" rx="1.5" />
						<path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Slack.displayName = 'Slack';

export { Slack };
