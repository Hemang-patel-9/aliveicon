'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const upSmallVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const HardDriveUpload = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m16 6-4-4-4 4"
						variants={upSmallVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 2v8" variants={upSmallVariants} initial="normal" animate={controls} />
					<rect width="20" height="8" x="2" y="14" rx="2" />
					<motion.path
						d="M6 18h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M10 18h.01"
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

HardDriveUpload.displayName = 'HardDriveUpload';

export { HardDriveUpload };
