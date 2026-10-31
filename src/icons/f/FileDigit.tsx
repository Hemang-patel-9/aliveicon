'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tickVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		y: [0, -1.5, 0],
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const FileDigit = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2" />
					<path d="M14 2v5a1 1 0 0 0 1 1h5" />
					<motion.g variants={tickVariants} custom={0.12} initial="normal" animate={controls}>
						<path d="M10 16h2v6" />
						<path d="M10 22h4" />
					</motion.g>
					<motion.rect
						x="2"
						y="16"
						width="4"
						height="6"
						rx="2"
						variants={tickVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FileDigit.displayName = 'FileDigit';

export { FileDigit };
