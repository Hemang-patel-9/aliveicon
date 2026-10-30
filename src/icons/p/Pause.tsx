'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pressVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scaleY: [1, 0.8, 1],
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const Pause = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						x="14"
						y="3"
						width="5"
						height="18"
						rx="1"
						variants={pressVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="5"
						y="3"
						width="5"
						height="18"
						rx="1"
						variants={pressVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Pause.displayName = 'Pause';

export { Pause };
