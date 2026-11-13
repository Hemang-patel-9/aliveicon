'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
};

const Asterisk = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

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
					d="M12 5v14"
					variants={pathVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="m18.065 8.496-12.125 7"
					variants={pathVariants}
					initial="normal"
					animate={controls}
					custom={0.2}
				/>
				<motion.path
					d="m5.94 8.504 12.125 7"
					variants={pathVariants}
					initial="normal"
					animate={controls}
					custom={0.4}
				/>
			</svg>
		</div>
	);
});

Asterisk.displayName = 'Asterisk';

export { Asterisk };
