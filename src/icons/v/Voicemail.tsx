'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon, type AnimationDefinition } from '../../lib/use-animated-icon';

const animateTarget: AnimationDefinition = (i) => ({
	pathLength: [0, 1],
	opacity: [0, 1],
	transition: {
		duration: 0.5,
		delay: i * 0.1,
		ease: 'easeInOut',
	},
});

const pathVariants = { visible: { pathLength: 1, opacity: 1 } };

const Voicemail = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
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
					cx="6"
					cy="12"
					r="4"
					initial="visible"
					animate={controls}
					custom={0}
					variants={pathVariants}
				/>
				<motion.circle
					cx="18"
					cy="12"
					r="4"
					initial="visible"
					animate={controls}
					custom={1}
					variants={pathVariants}
				/>
				<motion.line
					x1="6"
					y1="16"
					x2="18"
					y2="16"
					initial="visible"
					animate={controls}
					custom={2}
					variants={pathVariants}
				/>
			</svg>
		</div>
	);
});

Voicemail.displayName = 'Voicemail';
export { Voicemail };
