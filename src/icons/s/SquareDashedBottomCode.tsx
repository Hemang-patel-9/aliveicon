'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bodyVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.06, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const detailVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.15 + i * 0.1, ease: 'easeInOut' },
	}),
};

const SquareDashedBottomCode = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={bodyVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M10 9.5 8 12l2 2.5" />
						<path d="M14 21h1" />
						<path d="m14 9.5 2 2.5-2 2.5" />
					</motion.g>
					<motion.path
						d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"
						variants={detailVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 21h1"
						variants={detailVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SquareDashedBottomCode.displayName = 'SquareDashedBottomCode';

export { SquareDashedBottomCode };
