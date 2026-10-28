'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.4, 1.6, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.45, ease: 'easeOut' },
	},
};

const ClockAlert = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 6v6l4 2"
						custom={0}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 12v5"
						custom={1}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M20 21h.01" variants={dotVariants} initial="normal" animate={controls} />
					<path d="M21.25 8.2A10 10 0 1 0 16 21.16" />
				</svg>
			</div>
		);
	}
);

ClockAlert.displayName = 'ClockAlert';

export { ClockAlert };
