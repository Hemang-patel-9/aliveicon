'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export interface BellProps extends AnimatedIconProps {
	swingAngle?: number;
	duration?: number;
}

const bellVariants: Variants = {
	normal: { rotate: 0 },
	animate: ([angle, duration]: [number, number]) => ({
		rotate: [0, -angle, angle, -angle, 0],
		transition: { duration, ease: 'easeInOut' },
	}),
};

const Bell = forwardRef<AnimatedIconHandle, BellProps>(
	({ className, size = 28, style, swingAngle = 15, duration = 1, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<motion.svg
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
					custom={[swingAngle, duration]}
					variants={bellVariants}
					initial="normal"
					animate={controls}
					style={{ originX: '50%', originY: '10%' }}
				>
					<path d="M10.268 21a2 2 0 0 0 3.464 0" />
					<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
				</motion.svg>
			</div>
		);
	}
);

Bell.displayName = 'Bell';

export { Bell };
