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

const circleVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.2, 1],
		opacity: [1, 1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			repeat: 1,
		},
	},
};

export const BookKey = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M17 2v6" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M17 4h2" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="17"
					cy="10"
					r="2"
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

BookKey.displayName = 'BookKey';
