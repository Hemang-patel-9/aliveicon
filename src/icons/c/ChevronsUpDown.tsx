'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { y: 0 },
	animate: (distance: number) => ({
		y: [0, distance, 0],
		transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
	}),
};

const ChevronsUpDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m7 15 5 5 5-5"
					custom={2}
					variants={chevronVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m7 9 5-5 5 5"
					custom={-2}
					variants={chevronVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ChevronsUpDown.displayName = 'ChevronsUpDown';

export { ChevronsUpDown };
