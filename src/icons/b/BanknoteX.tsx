'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const strokeVariants: Variants = {
	normal: { opacity: 1, pathLength: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const BanknoteX = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

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
					d="M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"
					variants={strokeVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="m17 17 5 5" variants={strokeVariants} initial="normal" animate={controls} />
				<motion.path d="M18 12h.01" variants={strokeVariants} initial="normal" animate={controls} />
				<motion.path d="m22 17-5 5" variants={strokeVariants} initial="normal" animate={controls} />
				<motion.path d="M6 12h.01" variants={strokeVariants} initial="normal" animate={controls} />
				<motion.circle
					cx="12"
					cy="12"
					r="2"
					variants={strokeVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

BanknoteX.displayName = 'BanknoteX';

export { BanknoteX };
