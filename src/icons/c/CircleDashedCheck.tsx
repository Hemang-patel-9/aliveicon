'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, delay: i * 0.06, ease: 'easeOut' },
	}),
};

const CircleDashedCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10.1 2.182a10 10 0 013.8 0"
						custom={0}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17.609 3.721a10 10 0 012.69 2.7"
						custom={1}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21.818 10.1a10 10 0 010 3.8"
						custom={2}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.279 17.609a10 10 0 01-2.7 2.69"
						custom={3}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13.9 21.818a10 10 0 01-3.8 0"
						custom={4}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.391 20.279a10 10 0 01-2.69-2.7"
						custom={5}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2.182 13.9a10 10 0 010-3.8"
						custom={6}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.721 6.391a10 10 0 012.7-2.69"
						custom={7}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m16 9-5.5 5.5L8 12"
						custom={8}
						variants={dashVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleDashedCheck.displayName = 'CircleDashedCheck';

export { CircleDashedCheck };
