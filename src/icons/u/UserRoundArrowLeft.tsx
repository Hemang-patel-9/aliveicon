'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const leftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const UserRoundArrowLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="m19 16-3 3" variants={leftVariants} initial="normal" animate={controls} />
					<path d="M2 21a8 8 0 0 1 12.664-6.5" />
					<motion.path
						d="M22 19h-6l3 3"
						variants={leftVariants}
						initial="normal"
						animate={controls}
					/>
					<circle cx="10" cy="8" r="5" />
				</svg>
			</div>
		);
	}
);

UserRoundArrowLeft.displayName = 'UserRoundArrowLeft';

export { UserRoundArrowLeft };
