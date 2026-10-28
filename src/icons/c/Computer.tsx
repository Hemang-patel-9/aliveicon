'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.4, 1.6, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.4, ease: 'easeOut' },
	},
};

const Computer = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 18h6"
						custom={1}
						variants={lineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M6 18h.01" variants={dotVariants} initial="normal" animate={controls} />
					<motion.path
						d="M8 6h1"
						custom={0}
						variants={lineVariants}
						initial="normal"
						animate={controls}
					/>
					<rect x="2" y="14" width="20" height="8" rx="2" />
					<rect x="4" y="2" width="16" height="12" rx="2" />
				</svg>
			</div>
		);
	}
);

Computer.displayName = 'Computer';

export { Computer };
