'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dividerVariants: Variants = {
	normal: { pathLength: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [1, 0.4, 1],
		transition: { duration: 0.45, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const KeyboardMusic = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<rect width="20" height="16" x="2" y="4" rx="2" />
					<path d="M6 8h4" />
					<path d="M14 8h.01" />
					<path d="M18 8h.01" />
					<path d="M2 12h20" />
					<motion.path
						d="M6 12v4"
						variants={dividerVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M10 12v4"
						variants={dividerVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M14 12v4"
						variants={dividerVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M18 12v4"
						variants={dividerVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
				</svg>
			</div>
		);
	}
);

KeyboardMusic.displayName = 'KeyboardMusic';

export { KeyboardMusic };
