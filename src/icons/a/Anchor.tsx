'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const Anchor = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { animate: 'animate1' });

	const pathVariants = {
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
				<motion.path d="M12 22V8" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M5 12H2a10 10 0 0 0 20 0h-3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="12"
					cy="5"
					r="3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Anchor.displayName = 'Anchor';
