'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 90, 90, 0],
		transition: { duration: 0.8, times: [0, 0.4, 0.6, 1], ease: 'easeInOut' },
	},
};

const SunSnow = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={turnVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M10 21v-1" />
						<path d="M10 4V3" />
						<path d="M10 9a3 3 0 0 0 0 6" />
						<path d="m14 20 1.25-2.5L18 18" />
						<path d="m14 4 1.25 2.5L18 6" />
						<path d="m17 21-3-6 1.5-3H22" />
						<path d="m17 3-3 6 1.5 3" />
						<path d="M2 12h1" />
						<path d="m20 10-1.5 2 1.5 2" />
						<path d="m3.64 18.36.7-.7" />
						<path d="m4.34 6.34-.7-.7" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

SunSnow.displayName = 'SunSnow';

export { SunSnow };
