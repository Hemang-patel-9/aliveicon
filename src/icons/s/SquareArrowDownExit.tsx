'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const SquareArrowDownExit = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M17.67 21H19a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h1.33" />
				<motion.g variants={arrowVariants} initial="normal" animate={controls}>
					<path d="M12 11v10" />
					<path d="m8 17 4 4 4-4" />
				</motion.g>
			</svg>
		</div>
	);
});

SquareArrowDownExit.displayName = 'SquareArrowDownExit';

export { SquareArrowDownExit };
