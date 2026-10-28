'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const flakeVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [-3, 0],
		opacity: [0, 1],
		transition: { duration: 0.45, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const CloudSnow = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
					<motion.path
						d="M8 15h.01"
						custom={0}
						variants={flakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 19h.01"
						custom={0}
						variants={flakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 17h.01"
						custom={1}
						variants={flakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 21h.01"
						custom={1}
						variants={flakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 15h.01"
						custom={2}
						variants={flakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 19h.01"
						custom={2}
						variants={flakeVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CloudSnow.displayName = 'CloudSnow';

export { CloudSnow };
