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

const TouchpadOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 20v-6"
						variants={drawVariants}
						custom={[0.2, 1, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.656 14H22"
						variants={drawVariants}
						custom={[0.1, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 14h12"
						variants={drawVariants}
						custom={[0, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 2 20 20"
						variants={drawVariants}
						custom={[0.45, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
					<path d="M9.656 4H20a2 2 0 0 1 2 2v10.344" />
				</svg>
			</div>
		);
	}
);

TouchpadOff.displayName = 'TouchpadOff';

export { TouchpadOff };
