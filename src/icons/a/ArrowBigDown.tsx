'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const groupVariants: Variants = {
	initial: { y: 0, scale: 1, opacity: 1 },
	animate: {
		y: [0, 4, 0],
		scale: [1, 1.1, 1],
		opacity: [1, 1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const ArrowBigDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g variants={groupVariants} initial="initial" animate={controls}>
					<path d="M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z" />
				</motion.g>
			</svg>
		</div>
	);
});

ArrowBigDown.displayName = 'ArrowBigDown';
