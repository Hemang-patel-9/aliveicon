'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const foldLeftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const foldRightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const FoldHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={foldLeftVariants} initial="normal" animate={controls}>
						<path d="M2 12h6" />
						<path d="m5 15 3-3-3-3" />
					</motion.g>
					<motion.g variants={foldRightVariants} initial="normal" animate={controls}>
						<path d="M22 12h-6" />
						<path d="m19 9-3 3 3 3" />
					</motion.g>
					<path d="M12 2v2" />
					<path d="M12 8v2" />
					<path d="M12 14v2" />
					<path d="M12 20v2" />
				</svg>
			</div>
		);
	}
);

FoldHorizontal.displayName = 'FoldHorizontal';

export { FoldHorizontal };
