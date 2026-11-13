'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const ChevronsRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { rest: 'initial' });

	const motionVariants: Variants = {
		initial: { x: 0 },
		animate: {
			x: [0, 5, 0],
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
			},
		},
	};

	return (
		<div {...iconProps}>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="m13 7 5 5-5 5"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="m6 7 5 5-5 5"
					variants={motionVariants}
					initial="initial"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ChevronsRight.displayName = 'ChevronsRight';
