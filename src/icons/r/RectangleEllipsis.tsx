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
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

export const RectangleEllipsis = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					x="2"
					y="6"
					width="20"
					height="12"
					rx="2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M12 12h.01" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M17 12h.01" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M7 12h.01" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

RectangleEllipsis.displayName = 'RectangleEllipsis';
