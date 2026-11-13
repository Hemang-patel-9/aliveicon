'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeLeftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -3, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const SquareArrowUpLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g
					variants={nudgeLeftVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path d="M15 15 9 9" />
					<path d="M9 15V9h6" />
					<rect x="3" y="3" width="18" height="18" rx="2" />
				</motion.g>
			</svg>
		</div>
	);
});

SquareArrowUpLeft.displayName = 'SquareArrowUpLeft';

export { SquareArrowUpLeft };
