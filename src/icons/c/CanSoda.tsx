'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const canVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.25 } },
	animate: {
		rotate: [0, -4, 4, -2, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const CanSoda = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={canVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="m17 22 1.664-2.496a2 2 0 00.336-1.11V5.606a2 2 0 00-.336-1.11L17 2" />
						<path d="M18 22H6" />
						<path d="M18 2H6" />
						<path d="M5 17h14" />
						<path d="M5 7h14" />
						<path d="m7 22-1.664-2.496A2 2 0 015 18.394V5.606a2 2 0 01.336-1.11L7 2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CanSoda.displayName = 'CanSoda';

export { CanSoda };
