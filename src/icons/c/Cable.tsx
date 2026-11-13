'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const Cable = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const pathVariants: Variants = {
		normal: { pathLength: 1, opacity: 1 },
		animate: {
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: {
				duration: 0.6,
				ease: 'easeInOut',
				staggerChildren: 0.08,
			},
		},
	};

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
					d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M17 21v-2" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M21 21v-2" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M3 5V3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M7 5V3" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

Cable.displayName = 'Cable';
export { Cable };
