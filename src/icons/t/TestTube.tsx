'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shakeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.8, 0.8, -0.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const liquidVariants: Variants = {
	normal: { x: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.8, 0.8, -0.5, 0],
		rotate: [0, -12, 10, -5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TestTube = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={shakeVariants} initial="normal" animate={controls}>
						<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" />
						<path d="M8.5 2h7" />
					</motion.g>
					<motion.path
						d="M14.5 16h-5"
						variants={liquidVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TestTube.displayName = 'TestTube';

export { TestTube };
