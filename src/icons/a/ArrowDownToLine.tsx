'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, 3, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const lineVariants: Variants = {
	normal: { pathLength: 1 },
	animate: {
		pathLength: [1, 0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const ArrowDownToLine = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M12 17V3" />
					<motion.path
						d="m6 11 6 6 6-6"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M19 21H5" variants={lineVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

ArrowDownToLine.displayName = 'ArrowDownToLine';

export { ArrowDownToLine };
