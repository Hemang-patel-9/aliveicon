'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	initial: { x: 0, scale: 1 },
	animate: {
		x: [0, -4, 0],
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
		x: [0, -2, 0],
		scale: [1, 1.1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const ArrowBigLeftDash = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				style={{ overflow: 'visible' }}
			>
				<motion.path d="M20 9v6" variants={dashVariants} initial="initial" animate={controls} />
				<motion.path
					d="M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
					variants={arrowVariants}
					initial="initial"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigLeftDash.displayName = 'ArrowBigLeftDash';
