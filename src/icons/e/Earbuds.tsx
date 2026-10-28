'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const budVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [0, -1, 0],
		transition: { duration: 0.5, delay: i * 0.12, ease: 'easeInOut' },
	}),
};

const Earbuds = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M18 3a4 4 90 00-4 4v12a2 2 90 004 0v-8a5 5 90 003.75-1.693 1 1 90 00.25-.661V5.354a1 1 90 00-.25-.661A5 5 90 0018 3"
						custom={1}
						variants={budVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 3a4 4 0 014 4v12a2 2 0 01-4 0v-8a5 5 0 01-3.75-1.693A1 1 0 012 8.646V5.354a1 1 0 01.25-.661A5 5 0 016 3"
						custom={0}
						variants={budVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Earbuds.displayName = 'Earbuds';

export { Earbuds };
