'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const startVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.6, 1],
		transition: { duration: 0.3, ease: 'easeOut' },
	},
};

const routeVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.55, delay: 0.1, ease: 'easeInOut' },
	},
};

const arrowVariants: Variants = {
	normal: { x: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		x: [-4, 0],
		opacity: [0, 1],
		transition: { duration: 0.25, delay: 0.6, ease: 'easeOut' },
	},
};

const RouteArrowRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.circle
					cx="6"
					cy="5"
					r="3"
					variants={startVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M9 5h8.5a1 1 0 010 7h-11a1 1 0 000 7H21"
					variants={routeVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m18 22 3-3-3-3"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

RouteArrowRight.displayName = 'RouteArrowRight';

export { RouteArrowRight };
