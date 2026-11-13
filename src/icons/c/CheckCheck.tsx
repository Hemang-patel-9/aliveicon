'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const CheckCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { rest: 'initial' });

	const pathVariants: Variants = {
		initial: { pathLength: 1 },
		animate: {
			pathLength: [0, 1],
			transition: { duration: 0.4, ease: 'easeInOut' },
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
					d="M18 6 7 17l-5-5"
					variants={pathVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path
					d="m22 10-7.5 7.5L13 16"
					variants={pathVariants}
					initial="initial"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CheckCheck.displayName = 'CheckCheck';
