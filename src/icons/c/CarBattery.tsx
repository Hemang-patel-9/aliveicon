'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const signVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0.5, 1.25, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const CarBattery = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						custom={0}
						variants={signVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M14 13h4" />
						<path d="M16 15v-4" />
					</motion.g>
					<path d="M18 5v2" />
					<motion.path
						d="M6 13h4"
						style={{ originX: '50%', originY: '50%' }}
						custom={1}
						variants={signVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M6 5v2" />
					<rect x="2" y="7" width="20" height="12" rx="2" />
				</svg>
			</div>
		);
	}
);

CarBattery.displayName = 'CarBattery';

export { CarBattery };
