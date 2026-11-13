'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const topVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -0.8, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Cylinder = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.ellipse
					cx="12"
					cy="5"
					rx="9"
					ry="3"
					variants={topVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M3 5v14a9 3 0 0 0 18 0V5" />
			</svg>
		</div>
	);
});

Cylinder.displayName = 'Cylinder';

export { Cylinder };
