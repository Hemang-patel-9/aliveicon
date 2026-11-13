'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const circleVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [-2, 0],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const CirclePile = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.circle
					cx="12"
					cy="19"
					r="2"
					custom={0}
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="12"
					cy="5"
					r="2"
					custom={2}
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="16"
					cy="12"
					r="2"
					custom={1}
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="20"
					cy="19"
					r="2"
					custom={0}
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="4"
					cy="19"
					r="2"
					custom={0}
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="8"
					cy="12"
					r="2"
					custom={1}
					variants={circleVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CirclePile.displayName = 'CirclePile';

export { CirclePile };
