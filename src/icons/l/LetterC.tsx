'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tiltVariants: Variants = {
	normal: { rotate: 0, scale: 1, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 6, 0],
		scale: [1, 1.06, 1.06, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const LetterC = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={tiltVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M19 6.708a8 8 0 100 10.584" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

LetterC.displayName = 'LetterC';

export { LetterC };
