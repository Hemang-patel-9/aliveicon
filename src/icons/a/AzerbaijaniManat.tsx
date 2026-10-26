'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay, ease: 'easeInOut' },
	}),
};

const AzerbaijaniManat = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 4v16"
						variants={drawVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 20v-8a6 6 0 00-12 0v8"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

AzerbaijaniManat.displayName = 'AzerbaijaniManat';

export { AzerbaijaniManat };
