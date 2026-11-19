'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from]: [number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration: 0.25, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const GraphRing = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M17.006 19.241a8 8 0 0 1-10.011 0"
					variants={drawVariants}
					custom={[0.35, 0]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M19.919 14.143a8 8 0 0 0-4.971-8.583"
					variants={drawVariants}
					custom={[0.1, 1]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4.081 14.143A8 8 0 0 1 9.052 5.56"
					variants={drawVariants}
					custom={[0.6, 0]}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="12"
					cy="5.001"
					r="3"
					style={{ originX: '50%', originY: '50%' }}
					variants={popVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="19"
					cy="17"
					r="3"
					style={{ originX: '50%', originY: '50%' }}
					variants={popVariants}
					custom={0.3}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="5"
					cy="17"
					r="3"
					style={{ originX: '50%', originY: '50%' }}
					variants={popVariants}
					custom={0.55}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

GraphRing.displayName = 'GraphRing';

export { GraphRing };
