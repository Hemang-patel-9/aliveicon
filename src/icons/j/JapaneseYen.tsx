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

const JapaneseYen = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m6 4 6 8 6-8"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M12 12v8"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M8 13h8"
					variants={drawVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M8 17h8"
					variants={drawVariants}
					custom={2}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

JapaneseYen.displayName = 'JapaneseYen';

export { JapaneseYen };
