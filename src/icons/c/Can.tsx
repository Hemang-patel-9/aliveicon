'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const canVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.25 } },
	animate: {
		rotate: [0, -5, 3, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Can = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="M21 10.5a9 2.5 0 01-18 0v8a9 2.5 0 0018 0z" />
						<path d="M21 10.5A9 2.5 25.32 004.59 3.47 9 2.5 25.32 0021 10.5" />
						<path d="M3 10.5a9 2.5 0 016.527-2.405" />
						<path d="M9 16.858a31 31 0 006 0" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Can.displayName = 'Can';

export { Can };
