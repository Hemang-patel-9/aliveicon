'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowHeadVariants: Variants = {
	normal: { d: 'm5 12 7-7 7 7', translateY: 0 },
	animate: {
		d: 'm5 12 7-7 7 7',
		translateY: [0, 3, 0],
		transition: {
			duration: 0.4,
			ease: 'easeInOut',
		},
	},
};

const arrowLineVariants: Variants = {
	normal: { d: 'M12 19V5' },
	animate: {
		d: ['M12 19V5', 'M12 19V10', 'M12 19V5'],
		transition: {
			duration: 0.4,
			ease: 'easeInOut',
		},
	},
};

export const ArrowUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M12 19V5"
					variants={arrowLineVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m5 12 7-7 7 7"
					variants={arrowHeadVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowUp.displayName = 'ArrowUp';
