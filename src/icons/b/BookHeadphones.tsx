'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

const circleVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		scale: [0.7, 1.2, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const BookHeadphones = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M8 12v-2a4 4 0 0 1 8 0v2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="15"
					cy="12"
					r="1"
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="9"
					cy="12"
					r="1"
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

BookHeadphones.displayName = 'BookHeadphones';
