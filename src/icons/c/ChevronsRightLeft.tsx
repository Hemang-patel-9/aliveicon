'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { x: 0 },
	animate: (distance: number) => ({
		x: [0, distance, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	}),
};

const ChevronsRightLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M20 17L15 12L20 7"
						custom={-3}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 17L9 12L4 7"
						custom={3}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChevronsRightLeft.displayName = 'ChevronsRightLeft';

export { ChevronsRightLeft };
