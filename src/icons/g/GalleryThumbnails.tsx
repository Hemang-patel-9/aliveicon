'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const frameVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.95, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.5, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const GalleryThumbnails = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						width="18"
						height="14"
						x="3"
						y="3"
						rx="2"
						variants={frameVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					/>
					<motion.path
						d="M4 21h1"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 21h1"
						variants={popVariants}
						custom={0.18}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 21h1"
						variants={popVariants}
						custom={0.26}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 21h1"
						variants={popVariants}
						custom={0.34}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GalleryThumbnails.displayName = 'GalleryThumbnails';

export { GalleryThumbnails };
