'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const downArrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, 3, 0],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

const upArrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, -3, 0],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const ArrowDownUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M3 16l4 4 4-4"
					variants={downArrowVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M7 20V4" />
				<motion.path
					d="M21 8l-4-4-4 4"
					variants={upArrowVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M17 4v16" />
			</svg>
		</div>
	);
});

ArrowDownUp.displayName = 'ArrowDownUp';
