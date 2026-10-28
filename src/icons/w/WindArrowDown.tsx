'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const WindArrowDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 2v8"
						custom={0}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12.8 21.6A2 2 0 1 0 14 18H2"
						custom={1}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17.5 10a2.5 2.5 0 1 1 2 4H2"
						custom={2}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 6l4 4 4-4"
						custom={3}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

WindArrowDown.displayName = 'WindArrowDown';

export { WindArrowDown };
