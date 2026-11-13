'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const Anchor = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { animate: 'animate1' });

	const pathVariants: Variants = {
		normal: {
			opacity: 1,
			pathLength: 1,
			pathOffset: 0,
			transition: { duration: 0.1 },
		},
		animate1: {
			opacity: [0, 1],
			pathLength: [0, 1],
			pathOffset: [1, 0],
			transition: {
				duration: 0.3,
				ease: 'linear',
			},
		},
	};

	return (
		<div {...iconProps}>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path d="M12 6v16" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="m19 13 2-1a9 9 0 0 1-18 0l2 1"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M9 11h6" variants={pathVariants} initial="normal" animate={controls} />
				<motion.circle
					cx="12"
					cy="4"
					r="2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Anchor.displayName = 'Anchor';
