'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [0, -2, 0],
		transition: { duration: 0.45, delay: i * 0.12, ease: 'easeInOut' },
	}),
};

const ArrowsUpFromLine = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m4 6 3-3 3 3"
						variants={arrowVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 17V3"
						variants={arrowVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14 6 3-3 3 3"
						variants={arrowVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 17V3"
						variants={arrowVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<path d="M4 21h16" />
				</svg>
			</div>
		);
	}
);

ArrowsUpFromLine.displayName = 'ArrowsUpFromLine';

export { ArrowsUpFromLine };
