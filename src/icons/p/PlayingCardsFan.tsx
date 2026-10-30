'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const frontVariants: Variants = {
	normal: { x: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		rotate: [0, 6, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const backVariants: Variants = {
	normal: { x: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0],
		rotate: [0, -6, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const PlayingCardsFan = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M12.65 7.65a2 2 0 012.629-1.046l5.51 2.374a2 2 0 011.046 2.628l-3.957 9.184a2 2 0 01-2.628 1.046l-5.51-2.374a2 2 0 01-1.046-2.628z"
						variants={frontVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M18 7.777V4a2 2 0 00-2-2h-6a2 2 0 00-2 2v10a2 2 0 001.137 1.805" />
					<motion.path
						d="m8 4.389-4.364.809a2 2 0 00-1.602 2.33l1.822 9.833a2 2 0 002.331 1.602l2.542-.47"
						variants={backVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PlayingCardsFan.displayName = 'PlayingCardsFan';

export { PlayingCardsFan };
