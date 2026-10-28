'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		x: [0, -2, 0],
		transition: { duration: 0.45, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const CircleChevronsLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 9L7 12L10 15"
						custom={0}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 9L13 12L16 15"
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

CircleChevronsLeft.displayName = 'CircleChevronsLeft';

export { CircleChevronsLeft };
