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

const RulerDimensionLine = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M10 15v-3"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={1}
				/>
				<motion.path
					d="M14 15v-3"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={2}
				/>
				<motion.path
					d="M18 15v-3"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={3}
				/>
				<path d="M2 8V4" />
				<path d="M22 6H2" />
				<path d="M22 8V4" />
				<motion.path
					d="M6 15v-3"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<rect x="2" y="12" width="20" height="8" rx="2" />
			</svg>
		</div>
	);
});

RulerDimensionLine.displayName = 'RulerDimensionLine';

export { RulerDimensionLine };
