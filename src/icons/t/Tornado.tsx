'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const whirlVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		x: [0, 1.5, -1.5, 0],
		transition: { duration: 0.6, delay, ease: 'easeInOut' },
	}),
};

const Tornado = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M21 4H3"
						variants={whirlVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 8H6"
						variants={whirlVariants}
						custom={0.06}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 12H9"
						variants={whirlVariants}
						custom={0.12}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 16h-6"
						variants={whirlVariants}
						custom={0.18}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11 20H9"
						variants={whirlVariants}
						custom={0.24}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Tornado.displayName = 'Tornado';

export { Tornado };
