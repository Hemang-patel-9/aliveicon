'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const Bed = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const pathVariants: Variants = {
		normal: { pathLength: 1, opacity: 1 },
		animate: {
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: { duration: 0.7, ease: 'easeInOut' },
		},
	};

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
				<motion.path d="M2 4v16" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M2 8h18a2 2 0 0 1 2 2v10"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M2 17h20" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M6 8v9" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

Bed.displayName = 'Bed';
