'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const DURATION = 0.7;

const faceVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 1.1, 0.95, 1.1, 1],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const mouthVariants: Variants = {
	normal: { x: 0 },
	animate: {
		x: [0, -1, 1, -0.5, 0],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const leftEyeVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, -3, -1, 0],
		transition: { duration: DURATION, ease: 'easeOut' },
	},
};

const rightEyeVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, -2, -1, 0],
		transition: { duration: DURATION, ease: 'easeOut' },
	},
};

const Annoyed = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					cy="12"
					r="10"
					variants={faceVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M8 15h8" variants={mouthVariants} initial="normal" animate={controls} />
				<motion.path d="M8 9h2" variants={leftEyeVariants} initial="normal" animate={controls} />
				<motion.path d="M14 9h2" variants={rightEyeVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

Annoyed.displayName = 'Annoyed';

export { Annoyed };
