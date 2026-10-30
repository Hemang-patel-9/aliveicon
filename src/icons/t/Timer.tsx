'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pressVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 1, 0],
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
};

const handVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 360],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const Timer = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.line
						x1="10"
						x2="14"
						y1="2"
						y2="2"
						variants={pressVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="12"
						x2="15"
						y1="14"
						y2="11"
						variants={handVariants}
						style={{ originX: '0%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
					<circle cx="12" cy="14" r="8" />
				</svg>
			</div>
		);
	}
);

Timer.displayName = 'Timer';

export { Timer };
