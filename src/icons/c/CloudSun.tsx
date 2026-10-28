'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rayVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const CloudSun = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 2v2"
						custom={0}
						variants={rayVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m4.93 4.93 1.41 1.41"
						custom={1}
						variants={rayVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 12h2"
						custom={2}
						variants={rayVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m19.07 4.93-1.41 1.41"
						custom={3}
						variants={rayVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
					<path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
				</svg>
			</div>
		);
	}
);

CloudSun.displayName = 'CloudSun';

export { CloudSun };
