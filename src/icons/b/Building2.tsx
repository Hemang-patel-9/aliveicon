'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const Building2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const pathVariants: Variants = {
		normal: { pathLength: 1, opacity: 1 },
		animate: {
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
				staggerChildren: 0.03,
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
					d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M10 8h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M10 12h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path
					d="M14 21v-3a2 2 0 0 0-4 0v3"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Building2.displayName = 'Building2';
export { Building2 };
