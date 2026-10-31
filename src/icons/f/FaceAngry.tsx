'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shakeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.8, 0.8, -0.6, 0.6, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const browVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.8, 0.8, -0.6, 0.6, 0],
		y: [0, 0.8, 0.8, 0.8, 0.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const FaceAngry = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={shakeVariants} initial="normal" animate={controls}>
						<path d="M15 12v-1.584" />
						<path d="M9 12v-1.584" />
						<path d="M9 17a5 5 0 016.001 0" />
						<circle cx="12" cy="12" r="10" />
					</motion.g>
					<motion.path
						d="M17 10a5 5 0 00-3 1"
						variants={browVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 10a5 5 0 013 1"
						variants={browVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FaceAngry.displayName = 'FaceAngry';

export { FaceAngry };
