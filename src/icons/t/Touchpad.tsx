'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pressVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.96, 1],
		transition: { duration: 0.35, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const Touchpad = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.rect
					width="20"
					height="16"
					x="2"
					y="4"
					rx="2"
					variants={pressVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M2 14h20"
					variants={drawVariants}
					custom={[0.1, 0, 0.4]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M12 20v-6"
					variants={drawVariants}
					custom={[0.35, 1, 0.25]}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Touchpad.displayName = 'Touchpad';

export { Touchpad };
