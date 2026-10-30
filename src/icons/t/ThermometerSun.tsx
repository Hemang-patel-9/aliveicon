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

const ThermometerSun = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={drawVariants}
						custom={[0.2, 1, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 8a4 4 0 0 0-1.645 7.647"
						variants={drawVariants}
						custom={[0, 0, 0.5]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 12h2"
						variants={drawVariants}
						custom={[0.28, 1, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
					<motion.path
						d="m4.93 4.93 1.41 1.41"
						variants={drawVariants}
						custom={[0.36, 1, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m6.34 17.66-1.41 1.41"
						variants={drawVariants}
						custom={[0.44, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ThermometerSun.displayName = 'ThermometerSun';

export { ThermometerSun };
