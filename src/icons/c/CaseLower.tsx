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

export const CaseLower = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.circle
					cx="7"
					cy="12"
					r="3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M10 9v6" variants={pathVariants} initial="normal" animate={controls} />
				<motion.circle
					cx="17"
					cy="12"
					r="3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M14 7v8" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

CaseLower.displayName = 'CaseLower';
