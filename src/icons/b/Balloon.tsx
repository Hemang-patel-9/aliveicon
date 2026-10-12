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

const Balloon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1"
						variants={upSmallVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 6a2 2 0 0 1 2 2"
						variants={upSmallVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0"
						variants={upSmallVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Balloon.displayName = 'Balloon';

export { Balloon };
