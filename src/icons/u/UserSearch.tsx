'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const scanVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.5, 1, 0],
		y: [0, -1.5, 1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const UserSearch = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<circle cx="10" cy="7" r="4" />
					<path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
					<motion.circle
						cx="17"
						cy="17"
						r="3"
						variants={scanVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m21 21-1.9-1.9"
						variants={scanVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UserSearch.displayName = 'UserSearch';

export { UserSearch };
