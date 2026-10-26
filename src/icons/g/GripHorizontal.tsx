'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.6, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const GripHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						cx="12"
						cy="9"
						r="1"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="19"
						cy="9"
						r="1"
						variants={popVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="5"
						cy="9"
						r="1"
						variants={popVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="15"
						r="1"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="19"
						cy="15"
						r="1"
						variants={popVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="5"
						cy="15"
						r="1"
						variants={popVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GripHorizontal.displayName = 'GripHorizontal';

export { GripHorizontal };
