'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

const rectVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.1, 1],
		opacity: [1, 1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			repeat: 1,
		},
	},
};

export const BookLock = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M18 6V4a2 2 0 1 0-4 0v2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="12"
					y="6"
					width="8"
					height="5"
					rx="1"
					variants={rectVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

BookLock.displayName = 'BookLock';
