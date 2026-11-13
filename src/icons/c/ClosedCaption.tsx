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
		transition: { duration: 0.4, delay: i * 0.14, ease: 'easeOut' },
	}),
};

const ClosedCaption = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M10 9.17a3 3 0 1 0 0 5.66"
					custom={0}
					variants={drawVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M17 9.17a3 3 0 1 0 0 5.66"
					custom={1}
					variants={drawVariants}
					initial="normal"
					animate={controls}
				/>
				<rect x="2" y="5" width="20" height="14" rx="2" />
			</svg>
		</div>
	);
});

ClosedCaption.displayName = 'ClosedCaption';

export { ClosedCaption };
