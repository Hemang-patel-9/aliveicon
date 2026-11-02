'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const wiggleVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 2, -1.5, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const LifeBuoy = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={wiggleVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<circle cx="12" cy="12" r="10" />
						<path d="m4.93 4.93 4.24 4.24" />
						<path d="m14.83 9.17 4.24-4.24" />
						<path d="m14.83 14.83 4.24 4.24" />
						<path d="m9.17 14.83-4.24 4.24" />
						<circle cx="12" cy="12" r="4" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

LifeBuoy.displayName = 'LifeBuoy';

export { LifeBuoy };
