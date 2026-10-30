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

const TurkishLira = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m14 10-8 4"
						variants={drawVariants}
						custom={[0.45, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 5 6 9"
						variants={drawVariants}
						custom={[0.35, 1, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 12a8 8 0 01-7.003 7.937c-.547.07-.997-.385-.997-.937V4"
						variants={drawVariants}
						custom={[0, 1, 0.55]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TurkishLira.displayName = 'TurkishLira';

export { TurkishLira };
