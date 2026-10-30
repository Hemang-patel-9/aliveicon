'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const needleVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -30, 25, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const ParkingMeter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M11 15h2" />
					<motion.path
						d="M12 12v3"
						variants={needleVariants}
						style={{ originX: '50%', originY: '0%' }}
						initial="normal"
						animate={controls}
					/>
					<path d="M12 19v3" />
					<path d="M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z" />
					<motion.path
						d="M9 9a3 3 0 1 1 6 0"
						variants={drawVariants}
						custom={[0, 0, 0.5]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ParkingMeter.displayName = 'ParkingMeter';

export { ParkingMeter };
