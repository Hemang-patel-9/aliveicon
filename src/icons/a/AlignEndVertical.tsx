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

export const AlignEndVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.rect
					width="16"
					height="6"
					x="2"
					y="4"
					rx="2"
					variants={pathVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.rect
					width="9"
					height="6"
					x="9"
					y="14"
					rx="2"
					variants={pathVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.path d="M22 22V2" variants={pathVariants} animate={controls} initial="normal" />
			</svg>
		</div>
	);
});

AlignEndVertical.displayName = 'AlignEndVertical';
