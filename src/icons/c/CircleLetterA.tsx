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

const CircleLetterA = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m8 16 3.453-7.648a.6.6 0 0 1 1.094 0L16 16"
						custom={0}
						variants={glyphVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 14H9"
						custom={1}
						variants={glyphVariants}
						initial="normal"
						animate={controls}
					/>
					<circle cx="12" cy="12" r="10" />
				</svg>
			</div>
		);
	}
);

CircleLetterA.displayName = 'CircleLetterA';

export { CircleLetterA };
