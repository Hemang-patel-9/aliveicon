'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const spinVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 360],
		transition: { duration: 0.9, ease: 'easeInOut' },
	},
};

const FerrisWheel = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						style={{ originX: '50%', originY: '66.7%' }}
						initial="normal"
						animate={controls}
					>
						<circle cx="12" cy="12" r="2" />
						<path d="M12 2v4" />
						<path d="m6.8 15-3.5 2" />
						<path d="m20.7 7-3.5 2" />
						<path d="M6.8 9 3.3 7" />
						<path d="m20.7 17-3.5-2" />
					</motion.g>
					<path d="m9 22 3-8 3 8" />
					<path d="M8 22h8" />
					<path d="M18 18.7a9 9 0 1 0-12 0" />
				</svg>
			</div>
		);
	}
);

FerrisWheel.displayName = 'FerrisWheel';

export { FerrisWheel };
