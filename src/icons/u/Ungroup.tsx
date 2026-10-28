'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const boxVariants: Variants = {
	normal: { opacity: 1, x: 0, y: 0 },
	animate: (offset: number) => ({
		opacity: [0, 1],
		x: [offset, 0],
		y: [offset, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	}),
};

const Ungroup = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						x="5"
						y="4"
						width="8"
						height="6"
						rx="1"
						custom={-3}
						variants={boxVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="11"
						y="14"
						width="8"
						height="6"
						rx="1"
						custom={3}
						variants={boxVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Ungroup.displayName = 'Ungroup';

export { Ungroup };
