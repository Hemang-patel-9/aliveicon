'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: (i: number) => ({
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: {
			duration: 0.4,
			delay: i * 0.2,
		},
	}),
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
			delay: i * 0.2,
		},
	}),
};

export const AlignLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M21 5H3"
					variants={pathVariants}
					custom={0}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					d="M15 12H3"
					variants={pathVariants}
					custom={1}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					d="M17 19H3"
					variants={pathVariants}
					custom={2}
					animate={controls}
					initial="normal"
				/>
			</svg>
		</div>
	);
});

AlignLeft.displayName = 'AlignLeft';
