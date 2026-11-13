'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const scanVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.5, 1, 0],
		y: [0, -1.5, 1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const DatabaseSearch = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M21 11.693V5" />
				<motion.path
					d="m22 22-1.875-1.875"
					variants={scanVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M3 12a9 3 0 0 0 8.697 2.998" />
				<path d="M3 5v14a9 3 0 0 0 9.28 2.999" />
				<motion.circle
					cx="18"
					cy="18"
					r="3"
					variants={scanVariants}
					initial="normal"
					animate={controls}
				/>
				<ellipse cx="12" cy="5" rx="9" ry="3" />
			</svg>
		</div>
	);
});

DatabaseSearch.displayName = 'DatabaseSearch';

export { DatabaseSearch };
