'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swayVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -5, 4, -2, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const pulseVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.25, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Park = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M12 18h10" />
					<motion.path
						d="M13.248 9.998A4.5 4.5 0 0 0 11.75 8.6V8a1 1 0 0 0-7.5 0 4.9 4.9 0 0 0 2.25 9H8"
						variants={swayVariants}
						style={{ originX: '48%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
					<path d="m15 14-2 6" />
					<path d="m19 14 2 6" />
					<path d="M21 14h-8" />
					<path d="M8 20v-5.922a2 2 0 0 0-.586-1.414L6.5 11.75" />
					<path d="M9.205 12.795 8 14" />
					<motion.circle
						cx="19"
						cy="6"
						r="2"
						variants={pulseVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Park.displayName = 'Park';

export { Park };
