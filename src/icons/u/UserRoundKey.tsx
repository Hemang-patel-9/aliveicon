'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 25, -8, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const UserRoundKey = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={turnVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '80%' }}
					>
						<path d="M19 11v6" />
						<path d="M19 13h2" />
						<circle cx="19" cy="19" r="2" />
					</motion.g>
					<path d="M2 21a8 8 0 0 1 12.868-6.349" />
					<circle cx="10" cy="8" r="5" />
				</svg>
			</div>
		);
	}
);

UserRoundKey.displayName = 'UserRoundKey';

export { UserRoundKey };
