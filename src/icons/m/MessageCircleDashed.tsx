'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const MessageCircleDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10.1 2.182a10 10 0 0 1 3.8 0"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13.9 21.818a10 10 0 0 1-3.8 0"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17.609 3.72a10 10 0 0 1 2.69 2.7"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2.182 13.9a10 10 0 0 1 0-3.8"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.28 17.61a10 10 0 0 1-2.7 2.69"
						variants={drawVariants}
						custom={4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21.818 10.1a10 10 0 0 1 0 3.8"
						variants={drawVariants}
						custom={5}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.721 6.391a10 10 0 0 1 2.7-2.69"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

MessageCircleDashed.displayName = 'MessageCircleDashed';

export { MessageCircleDashed };
