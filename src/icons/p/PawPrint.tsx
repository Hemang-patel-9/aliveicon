'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const pressVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.9, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const PawPrint = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						cx="11"
						cy="4"
						r="2"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="18"
						cy="8"
						r="2"
						variants={popVariants}
						custom={0.18}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="20"
						cy="16"
						r="2"
						variants={popVariants}
						custom={0.26}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
						variants={pressVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PawPrint.displayName = 'PawPrint';

export { PawPrint };
