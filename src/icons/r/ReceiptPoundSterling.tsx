'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.2 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const ReceiptPoundSterling = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	(props, ref) => {
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
						d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M8 13h5" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M10 17V9.5a2.5 2.5 0 0 1 5 0"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M8 17h7" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

ReceiptPoundSterling.displayName = 'ReceiptPoundSterling';
