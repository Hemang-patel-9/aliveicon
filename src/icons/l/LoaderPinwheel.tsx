'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 90, 90, 0],
		transition: { duration: 0.8, times: [0, 0.4, 0.6, 1], ease: 'easeInOut' },
	},
};

const LoaderPinwheel = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={turnVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
					<path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
					<path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
					<circle cx="12" cy="12" r="10" />
				</motion.g>
			</svg>
		</div>
	);
});

LoaderPinwheel.displayName = 'LoaderPinwheel';

export { LoaderPinwheel };
