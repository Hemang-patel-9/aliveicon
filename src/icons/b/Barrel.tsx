'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const Barrel = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M10.5 2a34.5 34.5 0 000 20"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="M13.5 2a34.5 34.5 0 010 20"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={1}
				/>
				<motion.path
					d="M6.23 3.06a19 19 0 000 17.88A2 2 0 008 22h8a2 2 0 001.77-1.06 19 19 0 000-17.88A2 2 0 0016 2H8a2 2 0 00-1.77 1.06"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={2}
				/>
				<motion.path
					d="M4.67 17h14.67"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={3}
				/>
				<motion.path
					d="M4.67 7h14.67"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={4}
				/>
			</svg>
		</div>
	);
});

Barrel.displayName = 'Barrel';

export { Barrel };
