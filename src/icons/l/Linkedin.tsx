'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dotVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0, 1.3, 1],
		transition: { duration: 0.35, ease: 'easeOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const Linkedin = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.circle
					cx="4"
					cy="4"
					r="2"
					variants={dotVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					width="4"
					height="12"
					x="2"
					y="9"
					variants={drawVariants}
					custom={0.12}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
					variants={drawVariants}
					custom={0.24}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Linkedin.displayName = 'Linkedin';

export { Linkedin };
