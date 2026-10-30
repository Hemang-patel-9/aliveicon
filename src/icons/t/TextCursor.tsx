'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const blinkVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [1, 0.1, 1, 0.1, 1],
		transition: { duration: 0.8, ease: 'linear' },
	},
};

const TextCursor = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"
						variants={blinkVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 22h1a4 4 0 0 0 4-4"
						variants={blinkVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 2h1a4 4 0 0 1 4 4"
						variants={blinkVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TextCursor.displayName = 'TextCursor';

export { TextCursor };
