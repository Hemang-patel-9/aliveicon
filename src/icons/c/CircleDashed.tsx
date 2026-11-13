'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const CircleDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { rest: 'initial' });

	const motionVariants: Variants = {
		initial: { rotate: 0 },
		animate: {
			rotate: [0, 15, -15, 0],
			transition: {
				duration: 0.8,
				ease: 'easeInOut',
			},
		},
	};

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
				<motion.path
					d="M10.1 2.182a10 10 0 0 1 3.8 0"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="M13.9 21.818a10 10 0 0 1-3.8 0"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="M17.609 3.721a10 10 0 0 1 2.69 2.7"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="M2.182 13.9a10 10 0 0 1 0-3.8"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="M20.279 17.609a10 10 0 0 1-2.7 2.69"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="M21.818 10.1a10 10 0 0 1 0 3.8"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="M3.721 6.391a10 10 0 0 1 2.7-2.69"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="M6.391 20.279a10 10 0 0 1-2.69-2.7"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CircleDashed.displayName = 'CircleDashed';
