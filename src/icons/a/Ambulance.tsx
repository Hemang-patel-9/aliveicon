'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const draw = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.4 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const rearWheel = {
	normal: { scale: 1 },
	animate: { scale: [1, 1.2, 1] },
};

const frontWheel = {
	normal: { scale: 1 },
	animate: { scale: [1, 1.2, 1], transition: { delay: 0.3 } },
};

export const Ambulance = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M10 10H6" variants={draw} animate={controls} initial="normal" />
				<motion.path
					d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
					variants={draw}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"
					variants={draw}
					animate={controls}
					initial="normal"
				/>
				<motion.path d="M8 8v4" variants={draw} animate={controls} initial="normal" />
				<motion.path d="M9 18h6" variants={draw} animate={controls} initial="normal" />
				<motion.circle
					cx="17"
					cy="18"
					r="2"
					variants={rearWheel}
					animate={controls}
					initial="normal"
				/>
				<motion.circle
					cx="7"
					cy="18"
					r="2"
					variants={frontWheel}
					animate={controls}
					initial="normal"
				/>
			</svg>
		</div>
	);
});

Ambulance.displayName = 'Ambulance';
