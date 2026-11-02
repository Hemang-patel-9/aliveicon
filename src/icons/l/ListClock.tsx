'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const spinVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: 360,
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const ListClock = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={spinVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M16 13v2.2l1.6 1" />
						<path d="M3 12h3.458" />
						<path d="M3 19h3.832" />
						<path d="M3 5h18" />
						<circle cx="16" cy="15" r="6" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ListClock.displayName = 'ListClock';

export { ListClock };
