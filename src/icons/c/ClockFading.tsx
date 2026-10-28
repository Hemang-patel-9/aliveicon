'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const segmentVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, delay: i * 0.08, ease: 'easeOut' },
	}),
};

const ClockFading = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 2a10 10 0 0 1 7.38 16.75"
						custom={0}
						variants={segmentVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8.644 21.42a10 10 0 0 0 7.631-.38"
						custom={1}
						variants={segmentVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2.83 16a10 10 0 0 0 2.43 3.4"
						custom={2}
						variants={segmentVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2.5 8.875a10 10 0 0 0-.5 3"
						custom={3}
						variants={segmentVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4.636 5.235a10 10 0 0 1 .891-.857"
						custom={4}
						variants={segmentVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 6v6l4 2"
						custom={5}
						variants={segmentVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ClockFading.displayName = 'ClockFading';

export { ClockFading };
