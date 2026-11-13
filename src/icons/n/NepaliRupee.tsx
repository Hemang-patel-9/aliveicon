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

const NepaliRupee = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m14 20-8-8h4c5.333 0 5.333-8 0-8"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M14 8c4.078 0 5.038 4.678 2.88 6.88"
					variants={drawVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M6 4h12"
					variants={drawVariants}
					custom={2}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

NepaliRupee.displayName = 'NepaliRupee';

export { NepaliRupee };
