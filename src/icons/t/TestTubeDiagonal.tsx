'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shakeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.6, 0.6, -0.4, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const liquidVariants: Variants = {
	normal: { x: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.6, 0.6, -0.4, 0],
		rotate: [0, -10, 8, -4, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TestTubeDiagonal = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g variants={shakeVariants} initial="normal" animate={controls}>
					<path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" />
					<path d="m16 2 6 6" />
				</motion.g>
				<motion.path d="M12 16H4" variants={liquidVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

TestTubeDiagonal.displayName = 'TestTubeDiagonal';

export { TestTubeDiagonal };
