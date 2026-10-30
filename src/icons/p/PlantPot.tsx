'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swayVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -6, 5, -2, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const PlantPot = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M14 8.536V6a4 4 0 014-4h1.5a.5.5 0 01.5.5V4a4 4 0 01-4 4 4 4 0 00-4 4 5 5 0 01-8-4 5 5 0 018 4c0 2 1 3 1 5"
						variants={swayVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
					<path d="m18 17-1.085 3.58A2 2 0 0115 22H9.002a2 2 0 01-1.913-1.418L6 17" />
					<path d="M5 17h14" />
				</svg>
			</div>
		);
	}
);

PlantPot.displayName = 'PlantPot';

export { PlantPot };
