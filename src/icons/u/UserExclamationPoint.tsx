'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const barVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, ease: 'easeOut' },
	},
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.25, ease: 'easeOut' },
	},
};

const UserExclamationPoint = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M15 15H9a4 4 0 00-4 4v2" />
					<circle cx="12" cy="7" r="4" />
					<motion.path
						d="M18.988 13v4"
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18.988 21h.01"
						variants={dotVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UserExclamationPoint.displayName = 'UserExclamationPoint';

export { UserExclamationPoint };
