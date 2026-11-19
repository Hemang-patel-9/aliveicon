'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
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

const shiftVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ([x, y]: [number, number]) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	}),
};

const CaretsFromAxisDashedHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	(props, ref) => {
		const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

		return (
			<div {...iconProps}>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
					style={{ overflow: 'visible' }}
				>
					<motion.path
						d="M10 12H8"
						variants={drawVariants}
						custom={[0.16, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 12h-2"
						variants={drawVariants}
						custom={[0.22, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 12h-2"
						variants={drawVariants}
						custom={[0.28, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 12H2"
						variants={drawVariants}
						custom={[0.1, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7.298 17.712A1 1 0 0 1 8 16h8a1 1 0 0 1 .703 1.712l-3.991 3.99a1 1 0 0 1-1.424.001z"
						variants={shiftVariants}
						custom={[0, 1.5]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7.298 6.288A1 1 0 0 0 8 8h8a1 1 0 0 0 .703-1.712l-3.991-3.99a1 1 0 0 0-1.424-.001z"
						variants={shiftVariants}
						custom={[0, -1.5]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CaretsFromAxisDashedHorizontal.displayName = 'CaretsFromAxisDashedHorizontal';

export { CaretsFromAxisDashedHorizontal };
