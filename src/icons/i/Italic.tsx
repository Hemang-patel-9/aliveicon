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

const Italic = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.line
					x1="19"
					x2="10"
					y1="4"
					y2="4"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.line
					x1="14"
					x2="5"
					y1="20"
					y2="20"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={1}
				/>
				<motion.line
					x1="15"
					x2="9"
					y1="4"
					y2="20"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

Italic.displayName = 'Italic';

export { Italic };
