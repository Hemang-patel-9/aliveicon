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

export const CalendarCheck2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M8 2v3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M16 2v3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M 19 3 L 5 3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M 5 3 A2 2 0 0 0 3 5"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M 3 5 L 3 19" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M 3 19 A2 2 0 0 0 5 21"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M5 21 L12.5 21"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M 21 13 L 21 5"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M 21 5 A2 2 0 0 0 19 3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M3 9h18" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="m16 19 2 2 4-4"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CalendarCheck2.displayName = 'CalendarCheck2';
