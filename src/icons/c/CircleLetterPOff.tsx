'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const glyphVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const CircleLetterPOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12.656 7H13a3 3 0 0 1 2.984 3.307"
						custom={1}
						variants={glyphVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13 13H9"
						custom={2}
						variants={glyphVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M19.071 19.071A1 1 0 0 1 4.93 4.93" />
					<motion.path
						d="m2 2 20 20"
						custom={3}
						variants={glyphVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M8.357 2.687a10 10 0 0 1 12.956 12.956" />
					<motion.path
						d="M9 17V9"
						custom={0}
						variants={glyphVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleLetterPOff.displayName = 'CircleLetterPOff';

export { CircleLetterPOff };
