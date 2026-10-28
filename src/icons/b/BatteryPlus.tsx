'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const outlineVariants: Variants = {
	normal: { opacity: 1, pathLength: 1 },
	animate: {
		opacity: [0.5, 1],
		pathLength: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const plusVariants: Variants = {
	normal: { opacity: 1, scale: 1 },
	animate: {
		opacity: [0, 1],
		scale: [0.8, 1.1, 1],
		transition: { duration: 0.4, ease: 'easeOut' },
	},
};

const BatteryPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M10 9v6" variants={plusVariants} initial="normal" animate={controls} />
					<motion.path
						d="M13.5 7H16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2.5"
						variants={outlineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 11v2"
						variants={outlineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.5 17H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2.5"
						variants={outlineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M7 12h6" variants={plusVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

BatteryPlus.displayName = 'BatteryPlus';

export { BatteryPlus };
