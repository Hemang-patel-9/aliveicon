'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const hopVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0, -0.4, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const mouthVariants: Variants = {
	normal: { y: 0, scale: 1, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0, -0.4, 0],
		scale: [1, 1.1, 1, 1.05, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const FaceGrinning = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={hopVariants} initial="normal" animate={controls}>
						<path d="M15 10V9" />
						<path d="M9 10V9" />
					</motion.g>
					<motion.path
						d="M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302"
						variants={mouthVariants}
						style={{ originX: '50%', originY: '0%' }}
						initial="normal"
						animate={controls}
					/>
					<circle cx="12" cy="12" r="10" />
				</svg>
			</div>
		);
	}
);

FaceGrinning.displayName = 'FaceGrinning';

export { FaceGrinning };
