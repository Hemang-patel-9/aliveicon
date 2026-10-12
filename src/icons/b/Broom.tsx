'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const sweepTurnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -10, 8, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Broom = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={sweepTurnVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="M13.5 10.5 22 2" />
						<path d="M14.734 13.841a2 2 0 00-.314-2.42L12.58 9.58a2 2 0 00-2.421-.314l-7.657 4.461A1 1 0 002.3 15.3l6.403 6.403a1 1 0 001.571-.204z" />
						<path d="m5 18 2-2" />
						<path d="m7.699 10.7 5.602 5.601" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Broom.displayName = 'Broom';

export { Broom };
