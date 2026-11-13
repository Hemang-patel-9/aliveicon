'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const barVariants: Variants = {
	normal: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
	animate: {
		opacity: [0, 1],
		scale: [0.8, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const ChartBarBig = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M3 3v16a2 2 0 0 0 2 2h16"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="7"
					y="13"
					width="9"
					height="4"
					rx="1"
					variants={barVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="7"
					y="5"
					width="12"
					height="4"
					rx="1"
					variants={barVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ChartBarBig.displayName = 'ChartBarBig';

export { ChartBarBig };
