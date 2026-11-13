'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const Route = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={popVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M9 5h8.5a1 1 0 010 7h-11a1 1 0 000 7H15"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="18"
					cy="19"
					r="3"
					variants={popVariants}
					custom={5}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Route.displayName = 'Route';

export { Route };
