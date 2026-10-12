'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pressVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [0, 1.5, 0],
		transition: { duration: 0.35, delay: i * 0.07, ease: 'easeInOut' },
	}),
};

const Keyboard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 8h.01"
						variants={pressVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M12 12h.01"
						variants={pressVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M14 8h.01"
						variants={pressVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M16 12h.01"
						variants={pressVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="M18 8h.01"
						variants={pressVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
					<motion.path
						d="M6 8h.01"
						variants={pressVariants}
						initial="normal"
						animate={controls}
						custom={5}
					/>
					<path d="M7 16h10" />
					<motion.path
						d="M8 12h.01"
						variants={pressVariants}
						initial="normal"
						animate={controls}
						custom={6}
					/>
					<rect width="20" height="16" x="2" y="4" rx="2" />
				</svg>
			</div>
		);
	}
);

Keyboard.displayName = 'Keyboard';

export { Keyboard };
