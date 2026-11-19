'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const trailVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const ballVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.7, 1.25, 1],
		transition: { duration: 0.4, delay: 0.4, ease: 'easeInOut' },
	},
};

const CircleBounce = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M2 13c2.5.5 5 4 5 8 0-2.16 1.813-7.536 6-11.293"
					variants={trailVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="19"
					cy="6"
					r="3"
					style={{ originX: '50%', originY: '50%' }}
					variants={ballVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CircleBounce.displayName = 'CircleBounce';

export { CircleBounce };
