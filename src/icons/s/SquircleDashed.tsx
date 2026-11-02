'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const SquircleDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M13.77 3.043a34 34 0 0 0-3.54 0"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13.771 20.956a33 33 0 0 1-3.541.001"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.957 10.23a33 33 0 0 1 0 3.54"
						variants={drawVariants}
						custom={4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.043 10.23a34 34 0 0 0 .001 3.541"
						variants={drawVariants}
						custom={5}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SquircleDashed.displayName = 'SquircleDashed';

export { SquircleDashed };
