'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const liftVariants: Variants = {
	normal: { y: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -2, 0],
		rotate: [0, -4, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Glasses = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={liftVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<circle cx="6" cy="15" r="4" />
						<circle cx="18" cy="15" r="4" />
						<path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
						<path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
						<path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Glasses.displayName = 'Glasses';

export { Glasses };
