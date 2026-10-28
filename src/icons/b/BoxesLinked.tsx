'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cubeVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 0.9, 1],
		transition: { duration: 0.45, delay: i * 0.15, ease: 'easeInOut' },
	}),
};

const linkVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.1 + i * 0.15, ease: 'easeOut' },
	}),
};

const BoxesLinked = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M14 6h2a2 2 0 0 1 2 2v5"
						custom={1}
						variants={linkVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.g
						custom={1}
						variants={cubeVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M14.21 15.202 18 17.4V22" />
						<path d="M14.796 14.611A1.6 1.6 0 0 0 14 15.995v3.013a1.6 1.6 0 0 0 .797 1.384l2.4 1.392a1.6 1.6 0 0 0 1.606 0l2.4-1.392A1.6 1.6 0 0 0 22 19.008v-3.013a1.6 1.6 0 0 0-.796-1.384l-2.4-1.394a1.6 1.6 0 0 0-1.514-.051z" />
						<path d="m18 17.4 3.79-2.198" />
					</motion.g>
					<motion.path
						d="M2.21 4.202 6 6.4V16a2 2 0 0 0 2 2h2"
						custom={0}
						variants={linkVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.g
						custom={0}
						variants={cubeVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M2.796 3.611A1.6 1.6 0 0 0 2 4.995v3.013a1.6 1.6 0 0 0 .797 1.384l2.4 1.392a1.6 1.6 0 0 0 1.606 0l2.4-1.392A1.6 1.6 0 0 0 10 8.008V4.995a1.6 1.6 0 0 0-.796-1.384l-2.4-1.394a1.6 1.6 0 0 0-1.514-.052z" />
						<path d="m6 6.4 3.79-2.198" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

BoxesLinked.displayName = 'BoxesLinked';

export { BoxesLinked };
