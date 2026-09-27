'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const windVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
};

const AirVent = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div className={cn(className)} {...iconProps}>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
					<motion.path
						d="M6 8h12"
						variants={windVariants}
						initial="normal"
						animate={controls}
						custom={0.1}
					/>
					<motion.path
						d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"
						variants={windVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M6.6 15.6A2 2 0 1 0 10 17v-5"
						variants={windVariants}
						initial="normal"
						animate={controls}
						custom={0.2}
					/>
				</svg>
			</div>
		);
	}
);

AirVent.displayName = 'AirVent';

export { AirVent };
