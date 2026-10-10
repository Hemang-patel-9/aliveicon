'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const crossVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, delay: i * 0.15, ease: 'easeInOut' },
	}),
};

const AudioLinesX = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10 3v18" />
					<path d="M14 8v6.35" />
					<motion.path
						d="m17 17 5 5"
						variants={crossVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<path d="M18 5v8.1" />
					<path d="M2 10v3" />
					<path d="M22 10v3" />
					<motion.path
						d="m22 17-5 5"
						variants={crossVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<path d="M6 6v11" />
				</svg>
			</div>
		);
	}
);

AudioLinesX.displayName = 'AudioLinesX';

export { AudioLinesX };
