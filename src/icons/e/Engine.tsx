'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rumbleVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.8, 0.8, -0.8, 0.8, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Engine = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M10 3h6" variants={rumbleVariants} initial="normal" animate={controls} />
					<motion.path d="M13 3v4" variants={rumbleVariants} initial="normal" animate={controls} />
					<motion.path d="M2 10v6" variants={rumbleVariants} initial="normal" animate={controls} />
					<motion.path d="M2 13h4" variants={rumbleVariants} initial="normal" animate={controls} />
					<motion.path
						d="M6 16a2 2 0 002 2h1a2 2 0 011.6.8l.3.4a2 2 0 001.6.8h2.264a2 2 0 001.789-1.106l1.67-3.341a1 1 0 01.895-.553H21a1 1 0 001-1v-4a1 1 0 00-1-1h-3.5a1 1 0 01-.8-.4l-.9-1.2A1 1 0 0015 7h-4a1 1 0 00-.8.4l-.9 1.2a1 1 0 01-.8.4H7a1 1 0 00-1 1z"
						variants={rumbleVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Engine.displayName = 'Engine';

export { Engine };
