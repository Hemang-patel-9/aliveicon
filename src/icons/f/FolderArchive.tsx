'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tugVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		y: [0, 1, 0],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const FolderArchive = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="15"
						cy="19"
						r="2"
						variants={tugVariants}
						custom={0.25}
						initial="normal"
						animate={controls}
					/>
					<path d="M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1" />
					<motion.path
						d="M15 11v-1"
						variants={popVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 17v-2"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FolderArchive.displayName = 'FolderArchive';

export { FolderArchive };
