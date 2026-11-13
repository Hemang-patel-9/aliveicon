'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const Network = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.rect
					x="16"
					y="16"
					width="6"
					height="6"
					rx="1"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="2"
					y="16"
					width="6"
					height="6"
					rx="1"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="9"
					y="2"
					width="6"
					height="6"
					rx="1"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M12 12V8" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

Network.displayName = 'Network';
