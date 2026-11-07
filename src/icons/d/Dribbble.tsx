'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bounceVariants: Variants = {
	normal: { y: 0, rotate: 0, transition: { duration: 0 } },
	animate: {
		y: [0, -3, 0, -1, 0],
		rotate: 360,
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const Dribbble = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.g
						variants={bounceVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
						<path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
						<path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Dribbble.displayName = 'Dribbble';

export { Dribbble };
