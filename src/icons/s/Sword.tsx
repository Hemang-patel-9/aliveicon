'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tiltVariants: Variants = {
	normal: { rotate: 0, scale: 1, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 6, 0],
		scale: [1, 1.06, 1.06, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Sword = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={tiltVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="m11 19-6-6" />
						<path d="m5 21-2-2" />
						<path d="m8 16-4 4" />
						<path d="M9.5 17.5 20.414 6.586A2 2 0 0021 5.172V3h-2.172a2 2 0 00-1.414.586L6.5 14.5" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Sword.displayName = 'Sword';

export { Sword };
