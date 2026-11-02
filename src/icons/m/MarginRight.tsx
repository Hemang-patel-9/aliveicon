'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeRightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 3, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const MarginRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={nudgeRightVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<rect x="9" y="9" width="6" height="6" rx="1" />
						<path d="M21 3v18" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

MarginRight.displayName = 'MarginRight';

export { MarginRight };
