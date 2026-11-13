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

export const CalendarClock = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M16 2v3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M8 2v3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M3 9h5.859" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M16 14v2.2l1.6 1"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="16"
					cy="16"
					r="6"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CalendarClock.displayName = 'CalendarClock';
