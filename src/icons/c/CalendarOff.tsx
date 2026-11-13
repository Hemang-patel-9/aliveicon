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

export const CalendarOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M3.586 3.586A2 2 0 003 5v14a2 2 0 002 2h14a2 2 0 001.414-.586"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M8.656 3H19a2 2 0 012 2v10.344"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M16 2v3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M3 9h6" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M21 9h-5.5" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="m2 2 20 20" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

CalendarOff.displayName = 'CalendarOff';
