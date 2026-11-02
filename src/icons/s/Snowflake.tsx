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

const Snowflake = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						<path d="m10 20-1.25-2.5L6 18" />
						<path d="M10 4 8.75 6.5 6 6" />
						<path d="m14 20 1.25-2.5L18 18" />
						<path d="m14 4 1.25 2.5L18 6" />
						<path d="m17 21-3-6h-4" />
						<path d="m17 3-3 6 1.5 3" />
						<path d="M2 12h6.5L10 9" />
						<path d="m20 10-1.5 2 1.5 2" />
						<path d="M22 12h-6.5L14 15" />
						<path d="m4 10 1.5 2L4 14" />
						<path d="m7 21 3-6-1.5-3" />
						<path d="m7 3 3 6h4" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Snowflake.displayName = 'Snowflake';

export { Snowflake };
