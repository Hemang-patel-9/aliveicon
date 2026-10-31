'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swayVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 6, -3, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const leafRightVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 6, -3, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const leafLeftVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 8, -6, 3, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Flower2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={swayVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
						<circle cx="12" cy="8" r="2" />
					</motion.g>
					<path d="M12 10v12" />
					<motion.path
						d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"
						variants={leafRightVariants}
						style={{ originX: '0%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"
						variants={leafLeftVariants}
						style={{ originX: '100%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Flower2.displayName = 'Flower2';

export { Flower2 };
