'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const CirclePersonArmsSpread = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m15 17-3-3"
					variants={drawVariants}
					custom={[0.35, 1, 0.3]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M8 10s2 1 4 1 4-1 4-1"
					variants={drawVariants}
					custom={[0.15, 0.5, 0.3]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m9 17 3-3v-3"
					variants={drawVariants}
					custom={[0.25, 1, 0.4]}
					initial="normal"
					animate={controls}
				/>
				<circle cx="12" cy="12" r="10" />
				<motion.circle
					cx="12"
					cy="7"
					r=".5"
					fill="currentColor"
					style={{ originX: '50%', originY: '50%' }}
					variants={popVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CirclePersonArmsSpread.displayName = 'CirclePersonArmsSpread';

export { CirclePersonArmsSpread };
