'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const LayoutGridPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M15 18h6"
					variants={drawVariants}
					custom={[0.16, 0.5, 0.35]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M18 15v6"
					variants={drawVariants}
					custom={[0.28, 0.5, 0.35]}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="14"
					y="3"
					width="7"
					height="7"
					rx="1"
					variants={drawVariants}
					custom={[0.08, 1, 0.5]}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="3"
					y="14"
					width="7"
					height="7"
					rx="1"
					variants={drawVariants}
					custom={[0.24, 1, 0.5]}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="3"
					y="3"
					width="7"
					height="7"
					rx="1"
					variants={drawVariants}
					custom={[0, 1, 0.5]}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

LayoutGridPlus.displayName = 'LayoutGridPlus';

export { LayoutGridPlus };
