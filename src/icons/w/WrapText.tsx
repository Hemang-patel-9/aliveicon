'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const WrapText = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m16 16-3 3 3 3"
					custom={0}
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M3 12h14.5a1 1 0 0 1 0 7H13"
					custom={1}
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M3 19h6"
					custom={2}
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M3 5h18"
					custom={3}
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

WrapText.displayName = 'WrapText';

export { WrapText };
