'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const FingerprintPattern = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
						variants={drawVariants}
						custom={[0, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 13.12c0 2.38 0 6.38-1 8.88"
						variants={drawVariants}
						custom={[0.05, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
						variants={drawVariants}
						custom={[0.2, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 12a10 10 0 0 1 18-6"
						variants={drawVariants}
						custom={[0.3, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 16h.01"
						variants={popVariants}
						custom={0.4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21.8 16c.2-2 .131-5.354 0-6"
						variants={drawVariants}
						custom={[0.35, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
						variants={drawVariants}
						custom={[0.15, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8.65 22c.21-.66.45-1.32.57-2"
						variants={drawVariants}
						custom={[0.25, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 6.8a6 6 0 0 1 9 5.2v2"
						variants={drawVariants}
						custom={[0.1, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FingerprintPattern.displayName = 'FingerprintPattern';

export { FingerprintPattern };
