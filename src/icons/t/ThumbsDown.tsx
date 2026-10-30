'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bumpVariants: Variants = {
	normal: { rotate: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 12, -6, 0],
		y: [0, 1.5, 0, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const ThumbsDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={bumpVariants}
						style={{ originX: '50%', originY: '0%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
						<path d="M17 14V2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ThumbsDown.displayName = 'ThumbsDown';

export { ThumbsDown };
