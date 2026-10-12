'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const downRightVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1.5, 0],
		y: [0, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const HandleBottomRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M21 8 8 21"
						variants={downRightVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m21 15-6 6"
						variants={downRightVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

HandleBottomRight.displayName = 'HandleBottomRight';

export { HandleBottomRight };
