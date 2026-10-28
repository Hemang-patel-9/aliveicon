'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cartonVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.25 } },
	animate: {
		rotate: [0, -5, 3, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Carton = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={cartonVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="M13 22V10a2 2 0 01.539-1.367L16 6H8L5.539 8.633A2 2 0 005 10v10a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-.539-1.367L16 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3" />
						<path d="M5 10h8" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Carton.displayName = 'Carton';

export { Carton };
