'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const Carrot = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m8 15-2.58-2.58"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Carrot.displayName = 'Carrot';
