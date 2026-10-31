'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const foldBottomVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const foldTopVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const FoldVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={foldBottomVariants} initial="normal" animate={controls}>
						<path d="M12 22v-6" />
						<path d="m15 19-3-3-3 3" />
					</motion.g>
					<motion.g variants={foldTopVariants} initial="normal" animate={controls}>
						<path d="M12 8V2" />
						<path d="m15 5-3 3-3-3" />
					</motion.g>
					<path d="M4 12H2" />
					<path d="M10 12H8" />
					<path d="M16 12h-2" />
					<path d="M22 12h-2" />
				</svg>
			</div>
		);
	}
);

FoldVertical.displayName = 'FoldVertical';

export { FoldVertical };
