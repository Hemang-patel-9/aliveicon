'use client';

import { motion, type Transition, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const partVariants: Variants = {
	normal: { opacity: 1, scale: 1, y: 0, pathLength: 1 },
	animate: (i: number) => {
		const transition: Transition = { duration: 0.6, ease: 'easeInOut', delay: i * 0.05 };
		if (i < 4) return { opacity: [0, 1], scale: [0.6, 1], transition };
		if (i === 4) return { pathLength: [0, 1], opacity: [0, 1], transition };
		if (i === 5) return { y: [-10, 0], opacity: [0, 1], transition };
		return { scale: [0.8, 1], opacity: [0, 1], transition };
	},
};

const Replace = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M14 4a1 1 0 0 1 1-1"
					custom={0}
					variants={partVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M15 10a1 1 0 0 1-1-1"
					custom={1}
					variants={partVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M21 4a1 1 0 0 0-1-1"
					custom={2}
					variants={partVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M21 9a1 1 0 0 1-1 1"
					custom={3}
					variants={partVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m3 7 3 3 3-3"
					custom={4}
					variants={partVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M6 10V5a2 2 0 0 1 2-2h2"
					custom={5}
					variants={partVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="3"
					y="14"
					width="7"
					height="7"
					rx="1"
					custom={6}
					variants={partVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Replace.displayName = 'Replace';

export { Replace };
