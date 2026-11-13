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

const AtSign = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.circle
					cx="12"
					cy="12"
					r="4"
					variants={pathVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
					variants={pathVariants}
					initial="normal"
					animate={controls}
					custom={0.6}
				/>
			</svg>
		</div>
	);
});

AtSign.displayName = 'AtSign';

export { AtSign };
