'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const roofVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const doorVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: 0.15, ease: 'easeInOut' },
	},
};

const Doghouse = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m2 9.718 8.82-6.333a2 2 0 012.36 0L22 9.718"
					variants={roofVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="m20 8.282-1.007 10.902A2 2 0 0117 21H7a2 2 0 01-1.992-1.816L4 8.282" />
				<path d="M8.5 9.938a7 7 0 017 0" />
				<motion.path
					d="M9 21v-5a3 3 0 016 0v5"
					variants={doorVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Doghouse.displayName = 'Doghouse';

export { Doghouse };
