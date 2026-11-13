'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rightArrowVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const leftArrowVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const ArrowRightLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m16 3 4 4-4 4"
					variants={rightArrowVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M20 7H4"
					variants={rightArrowVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m8 21-4-4 4-4"
					variants={leftArrowVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4 17h16"
					variants={leftArrowVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowRightLeft.displayName = 'ArrowRightLeft';

export { ArrowRightLeft };
