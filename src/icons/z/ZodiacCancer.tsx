'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const ZodiacCancer = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M21 14.5A9 6.5 0 0 1 5.5 19"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="M3 9.5A9 6.5 0 0 1 18.5 5"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={1}
				/>
				<motion.circle
					cx="17.5"
					cy="14.5"
					r="3.5"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={2}
				/>
				<motion.circle
					cx="6.5"
					cy="9.5"
					r="3.5"
					variants={drawVariants}
					initial="normal"
					animate={controls}
					custom={3}
				/>
			</svg>
		</div>
	);
});

ZodiacCancer.displayName = 'ZodiacCancer';

export { ZodiacCancer };
