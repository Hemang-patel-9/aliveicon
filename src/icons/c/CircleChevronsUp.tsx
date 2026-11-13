'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [0, -2, 0],
		transition: { duration: 0.45, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const CircleChevronsUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M15 10L12 7L9 10"
					custom={0}
					variants={chevronVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M15 16L12 13L9 16"
					custom={1}
					variants={chevronVariants}
					initial="normal"
					animate={controls}
				/>
				<circle cx="12" cy="12" r="10" />
			</svg>
		</div>
	);
});

CircleChevronsUp.displayName = 'CircleChevronsUp';

export { CircleChevronsUp };
