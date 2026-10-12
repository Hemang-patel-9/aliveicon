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

const Drill = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z"
						variants={rumbleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8"
						variants={rumbleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3"
						variants={rumbleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M18 6h4" variants={rumbleVariants} initial="normal" animate={controls} />
					<motion.path
						d="m5 10-2 8"
						variants={rumbleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7 18 2-8"
						variants={rumbleVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Drill.displayName = 'Drill';

export { Drill };
