'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { y: 0 },
	animate: (distance: number) => ({
		y: [0, distance, 0],
		transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
	}),
};

const ChevronsUpDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="m7 15 5 5 5-5"
						custom={2}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7 9 5-5 5 5"
						custom={-2}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChevronsUpDown.displayName = 'ChevronsUpDown';

export { ChevronsUpDown };
