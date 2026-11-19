'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const shiftVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ([x, y]: [number, number]) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	}),
};

const CaretsFromAxisVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				style={{ overflow: 'visible' }}
			>
				<motion.path
					d="M12 2v20"
					variants={drawVariants}
					custom={[0, 0.5, 0.4]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M17.712 16.703A1 1 0 0 1 15.999 16V8a1 1 0 0 1 1.713-.703l3.99 3.991a1 1 0 0 1 .001 1.424z"
					variants={shiftVariants}
					custom={[1.5, 0]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M6.288 16.703A1 1 0 0 0 8.001 16V8a1 1 0 0 0-1.713-.703l-3.99 3.991a1 1 0 0 0-.001 1.424z"
					variants={shiftVariants}
					custom={[-1.5, 0]}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CaretsFromAxisVertical.displayName = 'CaretsFromAxisVertical';

export { CaretsFromAxisVertical };
