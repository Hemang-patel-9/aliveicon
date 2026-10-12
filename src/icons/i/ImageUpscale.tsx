'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		y: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const squareVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.1, 1],
		transition: { duration: 0.45, ease: 'easeInOut' },
	},
};

const ImageUpscale = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M16 3h5v5" variants={nudgeVariants} initial="normal" animate={controls} />
					<path d="M17 21h2a2 2 0 0 0 2-2" />
					<path d="M21 12v3" />
					<motion.path d="m21 3-5 5" variants={nudgeVariants} initial="normal" animate={controls} />
					<path d="M3 7V5a2 2 0 0 1 2-2" />
					<motion.g
						variants={squareVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19" />
						<rect x="3" y="11" width="10" height="10" rx="1" />
					</motion.g>
					<path d="M9 3h3" />
				</svg>
			</div>
		);
	}
);

ImageUpscale.displayName = 'ImageUpscale';

export { ImageUpscale };
