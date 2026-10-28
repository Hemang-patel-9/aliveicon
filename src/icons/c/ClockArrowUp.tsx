'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const handVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const arrowVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		y: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.45, delay: 0.3, ease: 'easeOut' },
	},
};

const ClockArrowUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M12 6v6l1.56.78"
						custom={0}
						variants={handVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M13.227 21.925a10 10 0 1 1 8.767-9.588" />
					<motion.g variants={arrowVariants} initial="normal" animate={controls}>
						<path d="m14 18 4-4 4 4" />
						<path d="M18 22v-8" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ClockArrowUp.displayName = 'ClockArrowUp';

export { ClockArrowUp };
