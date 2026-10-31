'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const scanVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0, 1, 0],
		y: [0, -0.8, 0, -0.8, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const FileSearchCorner = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<path d="M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25" />
					<path d="M14 2v5a1 1 0 0 0 1 1h5" />
					<motion.g variants={scanVariants} initial="normal" animate={controls}>
						<path d="m21 22-2.88-2.88" />
						<circle cx="16" cy="17" r="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

FileSearchCorner.displayName = 'FileSearchCorner';

export { FileSearchCorner };
