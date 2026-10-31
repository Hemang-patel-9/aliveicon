'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const leverVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 0.8, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const jerkVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -4, 3, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const FireExtinguisher = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" />
					<path d="M9 18h8" />
					<motion.path d="M18 3h-3" variants={leverVariants} initial="normal" animate={controls} />
					<motion.g
						variants={jerkVariants}
						style={{ originX: '100%', originY: '0%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M11 3a6 6 0 0 0-6 6v11" />
						<path d="M5 13h4" />
					</motion.g>
					<path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
				</svg>
			</div>
		);
	}
);

FireExtinguisher.displayName = 'FireExtinguisher';

export { FireExtinguisher };
