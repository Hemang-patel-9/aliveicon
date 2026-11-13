'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const RadioReceiver = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M5 16v2" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M19 16v2" variants={pathVariants} initial="normal" animate={controls} />
				<motion.rect
					width="20"
					height="8"
					x="2"
					y="8"
					rx="2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M18 12h.01" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

RadioReceiver.displayName = 'RadioReceiver';
