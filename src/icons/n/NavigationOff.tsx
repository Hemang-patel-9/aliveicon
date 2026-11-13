'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 1, ease: 'easeInOut' },
	},
};

export const NavigationOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M8.43 8.43 3 11l8 2 2 8 2.57-5.43"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M17.39 11.73 22 2l-9.73 4.61"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.line
					x1="2"
					y1="2"
					x2="22"
					y2="22"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

NavigationOff.displayName = 'NavigationOff';
