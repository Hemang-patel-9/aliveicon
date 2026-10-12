'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const ImagePlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M16 5h6"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M19 2v6"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
					<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
					<motion.circle
						cx="9"
						cy="9"
						r="2"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
				</svg>
			</div>
		);
	}
);

ImagePlus.displayName = 'ImagePlus';

export { ImagePlus };
