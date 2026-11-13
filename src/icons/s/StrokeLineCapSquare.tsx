'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const outlineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const markVariants: Variants = {
	normal: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		opacity: [0, 1],
		scale: [0.6, 1],
		transition: { duration: 0.25, delay: 0.25 + i * 0.08, ease: 'easeOut' },
	}),
};

const StrokeLineCapSquare = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M2 4h18a2 2 0 012 2v12a2 2 0 01-2 2H2"
					variants={outlineVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M2 12h2"
					variants={markVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M8 12h2"
					variants={markVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M13.99 12H14"
					variants={markVariants}
					custom={2}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

StrokeLineCapSquare.displayName = 'StrokeLineCapSquare';

export { StrokeLineCapSquare };
