'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const strokeVariants: Variants = {
	normal: { opacity: 1, strokeDashoffset: 0, strokeDasharray: '0 1' },
	animate: {
		strokeDashoffset: [1, 0],
		strokeDasharray: ['0 1', '1 0'],
		opacity: [0, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Banknote = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn(className)}
				style={{
					width: size,
					height: size,
					display: 'inline-block',
					...style,
				}}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						x="2"
						y="6"
						width="20"
						height="12"
						rx="2"
						variants={strokeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="2"
						variants={strokeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 12h.01"
						variants={strokeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 12h.01"
						variants={strokeVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Banknote.displayName = 'Banknote';

export { Banknote };
