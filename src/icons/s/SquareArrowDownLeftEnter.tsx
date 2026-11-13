'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		x: [3.5, 0],
		y: [-3.5, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

const SquareArrowDownLeftEnter = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M21 8.67V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h10.33" />
				<motion.g variants={arrowVariants} initial="normal" animate={controls}>
					<path d="M11 7v6h6" />
					<path d="m20 4-9 9" />
				</motion.g>
			</svg>
		</div>
	);
});

SquareArrowDownLeftEnter.displayName = 'SquareArrowDownLeftEnter';

export { SquareArrowDownLeftEnter };
