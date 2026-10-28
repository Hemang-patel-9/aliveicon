'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const clefVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const ClefAlto = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10 4v16" />
					<motion.path
						d="M14 4.764a3 3 0 1 1-.152 4.327A4 4 0 0 1 10 12a4 4 0 0 1 3.848 2.909A3 3 0 1 1 14 19.236"
						variants={clefVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M6 4v16" />
				</svg>
			</div>
		);
	}
);

ClefAlto.displayName = 'ClefAlto';

export { ClefAlto };
