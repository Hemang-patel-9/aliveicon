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
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const Heading6 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M4 12h8" />
					<path d="M4 18V6" />
					<path d="M12 18V6" />
					<motion.circle
						cx="19"
						cy="16"
						r="2"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M20 10c-2 2-3 3.5-3 6"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
				</svg>
			</div>
		);
	}
);

Heading6.displayName = 'Heading6';

export { Heading6 };
