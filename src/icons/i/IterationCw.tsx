'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const spinCwVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 360],
		transition: { duration: 0.9, ease: 'easeInOut' },
	},
};

const IterationCw = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={spinCwVariants}
					initial="normal"
					animate={controls}
					style={{ originX: '50%', originY: '50%' }}
				>
					<path d="M4 10a8 8 0 1 1 8 8H4" />
					<path d="m8 22-4-4 4-4" />
				</motion.g>
			</svg>
		</div>
	);
});

IterationCw.displayName = 'IterationCw';

export { IterationCw };
