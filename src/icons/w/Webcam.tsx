'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon, type AnimationDefinition } from '../../lib/use-animated-icon';

const animateTarget: AnimationDefinition = (i) => {
	if (i === 0) {
		return {
			r: [0, 8],
			opacity: [0, 1],
			transition: { duration: 0.6, ease: 'easeInOut' },
		};
	}
	if (i === 1) {
		return {
			scale: [0, 1],
			opacity: [0, 1],
			transformOrigin: 'center',
			transition: { duration: 0.6, ease: 'easeOut' },
		};
	}
	if (i === 2 || i === 3) {
		return {
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: { duration: 0.6, delay: 0.1 * (i - 2), ease: 'easeInOut' },
		};
	}
	return {};
};

const pathVariants = { normal: { pathLength: 1, opacity: 1 } };

const Webcam = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		animate: animateTarget,
	});

	return (
		<div {...iconProps}>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.circle
					cx="12"
					cy="10"
					r="8"
					initial="normal"
					animate={controls}
					custom={0}
					variants={{ normal: { r: 8, opacity: 1 } }}
				/>
				<motion.circle
					cx="12"
					cy="10"
					r="3"
					initial="normal"
					animate={controls}
					custom={1}
					variants={{ normal: { scale: 1, opacity: 1 } }}
				/>
				<motion.path
					d="M7 22h10"
					initial="normal"
					animate={controls}
					custom={2}
					variants={pathVariants}
				/>
				<motion.path
					d="M12 22v-4"
					initial="normal"
					animate={controls}
					custom={3}
					variants={pathVariants}
				/>
			</svg>
		</div>
	);
});

Webcam.displayName = 'Webcam';
export { Webcam };
