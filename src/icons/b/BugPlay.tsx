'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const BugPlay = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const pathVariants: Variants = {
		normal: { pathLength: 1, opacity: 1 },
		animate: {
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
				staggerChildren: 0.05,
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
					d="M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M14.12 3.88 16 2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M21 5a4 4 0 0 1-3.55 3.97"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M3 21a4 4 0 0 1 3.81-4"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M6 13H2" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M3 5a4 4 0 0 0 3.55 3.97"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m8 2 1.88 1.88"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M9 7.13V6a3 3 0 1 1 6 0v1.13"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

BugPlay.displayName = 'BugPlay';
export { BugPlay };
