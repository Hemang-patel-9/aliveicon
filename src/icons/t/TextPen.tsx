'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const penVariants: Variants = {
	normal: { x: 0, y: 0, rotate: 0, transition: { duration: 0.25 } },
	animate: {
		x: [0, -1.5, 0.5, -1, 0],
		y: [0, 0.5, -0.5, 0.5, 0],
		rotate: [0, -8, 6, -4, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const lineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay, ease: 'easeOut' },
	}),
};

const TextPen = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M21 5H3" />
				<motion.path
					d="M12 12H3"
					variants={lineVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="M8 19H3"
					variants={lineVariants}
					initial="normal"
					animate={controls}
					custom={0.3}
				/>
				<motion.path
					d="M21.377 14.626a1 1 0 10-3.004-3.004l-5.01 5.012a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506z"
					variants={penVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

TextPen.displayName = 'TextPen';

export { TextPen };
