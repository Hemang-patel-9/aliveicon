'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lidVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -0.8, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const arrowVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		y: [-1.5, 0],
		opacity: [0, 1],
		transition: { duration: 0.45, ease: 'easeOut' },
	},
};

const ArchiveArrowDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						width="20"
						height="5"
						x="2"
						y="3"
						rx="1"
						variants={lidVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M4 8v11a2 2 0 0 0 2 2h.343" />
					<path d="M20 8v11a2 2 0 0 1-2 2h-.343" />
					<motion.g variants={arrowVariants} initial="normal" animate={controls}>
						<path d="m9 18 3 3 3-3" />
						<path d="M12 12v9" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ArchiveArrowDown.displayName = 'ArchiveArrowDown';

export { ArchiveArrowDown };
