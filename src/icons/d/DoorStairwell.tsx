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

const DoorStairwell = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 17v-3a1 1 0 011-1h6"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M19 17h-9a1 1 0 00-1 1v3"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
					<motion.path
						d="M19 9h-3a1 1 0 00-1 1v3"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<path d="M22 21H2" />
				</svg>
			</div>
		);
	}
);

DoorStairwell.displayName = 'DoorStairwell';

export { DoorStairwell };
