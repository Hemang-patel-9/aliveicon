'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const steamVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [2, 0],
		opacity: [0, 1],
		transition: { duration: 0.45, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const Coffee = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M10 2v2"
					custom={1}
					variants={steamVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M14 2v2"
					custom={2}
					variants={steamVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
				<motion.path
					d="M6 2v2"
					custom={0}
					variants={steamVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Coffee.displayName = 'Coffee';

export { Coffee };
