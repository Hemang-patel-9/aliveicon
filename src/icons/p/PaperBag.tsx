'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const settleVariants: Variants = {
	normal: { y: 0, scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0, 0],
		scaleY: [1, 1, 0.94, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const PaperBag = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={settleVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002" />
						<path d="M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

PaperBag.displayName = 'PaperBag';

export { PaperBag };
