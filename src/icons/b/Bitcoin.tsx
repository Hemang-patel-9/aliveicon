'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			staggerChildren: 0.05,
		},
	},
};

export const Bitcoin = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M11.767 19.089 5.86 18.047"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M11.768 19.089l-.347 1.97"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M12.984 12.195c4.924.869 6.14-6.025 1.215-6.893"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M12.984 12.195l-3.94-.694"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M14.199 5.301 8.29 4.26"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M14.198 5.302l.348-1.97"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M7.48 20.364l3.126-17.727"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Bitcoin.displayName = 'Bitcoin';
