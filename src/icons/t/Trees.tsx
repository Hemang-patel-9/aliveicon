'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swayVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		rotate: [0, -5, 4, -2, 0],
		transition: { duration: 0.8, delay, ease: 'easeInOut' },
	}),
};

const Trees = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"
						variants={swayVariants}
						custom={0}
						style={{ originX: '56%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 16v6" />
					<path d="M13 19v3" />
					<motion.path
						d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
						variants={swayVariants}
						custom={0.1}
						style={{ originX: '15%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Trees.displayName = 'Trees';

export { Trees };
