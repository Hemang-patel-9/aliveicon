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

const XLineTop = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M18 4H6"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="M18 8 6 20"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={1}
				/>
				<motion.path
					d="m6 8 12 12"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

XLineTop.displayName = 'XLineTop';

export { XLineTop };
