'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const strikeVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -15, 6, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Gavel = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={strikeVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '0%', originY: '100%' }}
					>
						<path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" />
						<path d="m16 16 6-6" />
						<path d="m21.5 10.5-8-8" />
						<path d="m8 8 6-6" />
						<path d="m8.5 7.5 8 8" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Gavel.displayName = 'Gavel';

export { Gavel };
