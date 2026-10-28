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
		transition: { duration: 0.4, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const CaseSensitive = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"
						custom={0}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 9v7"
						custom={3}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.304 13h6.392"
						custom={1}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="18.5"
						cy="12.5"
						r="3.5"
						custom={2}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CaseSensitive.displayName = 'CaseSensitive';

export { CaseSensitive };
