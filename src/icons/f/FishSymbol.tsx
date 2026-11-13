'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swimVariants: Variants = {
	normal: { x: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 1.5, 0],
		rotate: [0, -5, 5, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const FishSymbol = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				style={{ overflow: 'visible' }}
			>
				<motion.path
					d="M2 16s9-15 20-4C11 23 2 8 2 8"
					variants={swimVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

FishSymbol.displayName = 'FishSymbol';

export { FishSymbol };
