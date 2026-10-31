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

const FileDatabase = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 12v8a5 2 0 01-10 0v-8"
						variants={drawVariants}
						custom={[0.2, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 16a5 2 0 01-10 0"
						variants={drawVariants}
						custom={[0.1, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
					<path d="M14 2v5a1 1 0 001 1h5" />
					<path d="M4 6.3V4a2 2 0 012-2h8a2.4 2.4 0 011.706.706l3.588 3.588A2.4 2.4 0 0120 8v12a2 2 0 01-2 2h-2.43" />
					<motion.ellipse
						cx="7"
						cy="12"
						rx="5"
						ry="2"
						variants={drawVariants}
						custom={[0, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FileDatabase.displayName = 'FileDatabase';

export { FileDatabase };
