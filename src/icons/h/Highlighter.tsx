'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const sweepVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 2, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Highlighter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m9 11-6 6v3h9l3-3"
						variants={sweepVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"
						variants={sweepVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Highlighter.displayName = 'Highlighter';

export { Highlighter };
