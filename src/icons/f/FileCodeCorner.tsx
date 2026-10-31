'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const leftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const rightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const FileCodeCorner = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35" />
					<path d="M14 2v5a1 1 0 0 0 1 1h5" />
					<motion.path
						d="m5 16-3 3 3 3"
						variants={leftVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m9 22 3-3-3-3"
						variants={rightVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FileCodeCorner.displayName = 'FileCodeCorner';

export { FileCodeCorner };
