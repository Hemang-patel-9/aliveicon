'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rocketVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.3 } },
	animate: {
		x: [0, 0, -1.5, 1, -1, 0.5, 0],
		y: [0, -2, 0, -1.5, -2, -1, 0],
		transition: { duration: 1.2, ease: 'easeInOut', times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1] },
	},
};

const flameVariants: Variants = {
	normal: {
		d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
		transition: { duration: 0.2 },
	},
	animate: {
		d: [
			'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
			'M4.5 16.5c-1.5 1.26-3 5.5-3 5.5s4.74-1 6-2.5c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
			'M4.5 16.5c-1.5 1.26-2.2 4.8-2.2 4.8s3.94-0.3 5.2-1.8c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
			'M4.5 16.5c-1.5 1.26-2.8 5.2-2.8 5.2s4.54-0.7 5.8-2.2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
			'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
		],
		transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], repeat: 1, times: [0, 0.2, 0.5, 0.8, 1] },
	},
};

const Rocket = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
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
					variants={rocketVariants}
					initial="normal"
					animate={controls}
				>
					<motion.path
						d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
						variants={flameVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
					<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
					<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
				</motion.svg>
			</div>
		);
	}
);

Rocket.displayName = 'Rocket';

export { Rocket };
