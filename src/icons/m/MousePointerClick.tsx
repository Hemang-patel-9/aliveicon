'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const MousePointerClick = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
			>
				<motion.path
					d="M14 4.1 12 6"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m5.1 8-2.9-.8"
					variants={drawVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m6 12-1.9 2"
					variants={drawVariants}
					custom={2}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M7.2 2.2 8 5.1"
					variants={drawVariants}
					custom={3}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
					variants={drawVariants}
					custom={4}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

MousePointerClick.displayName = 'MousePointerClick';

export { MousePointerClick };
