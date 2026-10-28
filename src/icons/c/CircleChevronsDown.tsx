'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [0, 2, 0],
		transition: { duration: 0.45, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const CircleChevronsDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M9 14L12 17L15 14"
						custom={0}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 8L12 11L15 8"
						custom={1}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<circle cx="12" cy="12" r="10" />
				</svg>
			</div>
		);
	}
);

CircleChevronsDown.displayName = 'CircleChevronsDown';

export { CircleChevronsDown };
