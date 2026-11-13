'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const LocateFixed = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.line
					x1="2"
					x2="5"
					y1="12"
					y2="12"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.line
					x1="19"
					x2="22"
					y1="12"
					y2="12"
					variants={drawVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
				<motion.line
					x1="12"
					x2="12"
					y1="2"
					y2="5"
					variants={drawVariants}
					custom={2}
					initial="normal"
					animate={controls}
				/>
				<motion.line
					x1="12"
					x2="12"
					y1="19"
					y2="22"
					variants={drawVariants}
					custom={3}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="12"
					cy="12"
					r="7"
					variants={drawVariants}
					custom={4}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="12"
					cy="12"
					r="3"
					variants={drawVariants}
					custom={5}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

LocateFixed.displayName = 'LocateFixed';

export { LocateFixed };
