'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const leftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const rightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Parentheses = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M8 21s-4-3-4-9 4-9 4-9"
					variants={leftVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M16 3s4 3 4 9-4 9-4 9"
					variants={rightVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Parentheses.displayName = 'Parentheses';

export { Parentheses };
