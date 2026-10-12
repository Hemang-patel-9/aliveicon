'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const Hotel = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10 22v-6.57" />
					<motion.path
						d="M12 11h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
					<motion.path
						d="M12 7h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<path d="M14 15.43V22" />
					<path d="M15 16a5 5 0 0 0-6 0" />
					<motion.path
						d="M16 11h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={5}
					/>
					<motion.path
						d="M16 7h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M8 11h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="M8 7h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<rect x="4" y="2" width="16" height="20" rx="2" />
				</svg>
			</div>
		);
	}
);

Hotel.displayName = 'Hotel';

export { Hotel };
