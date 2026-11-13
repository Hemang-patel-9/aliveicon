'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	initial: { x: 0, scale: 1 },
	animate: {
		x: [0, 4, 0],
		scale: [1, 1.1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

const dashVariants: Variants = {
	initial: { x: 0, scale: 1 },
	animate: {
		x: [0, 2, 0],
		scale: [1, 1.1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const ArrowBigRightDash = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { rest: 'initial' });

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
				<motion.path d="M5 9v6" variants={dashVariants} initial="initial" animate={controls} />
				<motion.path
					d="M9 9h3V5l7 7-7 7v-4H9V9z"
					variants={arrowVariants}
					initial="initial"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigRightDash.displayName = 'ArrowBigRightDash';
