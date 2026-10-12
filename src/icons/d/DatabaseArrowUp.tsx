'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const upVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const DatabaseArrowUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M19 22v-6" variants={upVariants} initial="normal" animate={controls} />
					<path d="M21 12.536V5" />
					<motion.path
						d="m22 19-3-3-3 3"
						variants={upVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M3 12A9 3 0 0 0 14.457 14.886" />
					<path d="M3 5V19A9 3 0 0 0 13.318 21.968" />
					<ellipse cx="12" cy="5" rx="9" ry="3" />
				</svg>
			</div>
		);
	}
);

DatabaseArrowUp.displayName = 'DatabaseArrowUp';

export { DatabaseArrowUp };
