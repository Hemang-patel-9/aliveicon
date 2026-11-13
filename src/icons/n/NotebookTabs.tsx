'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const NotebookTabs = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M2 6h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M2 10h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M2 14h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M2 18h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.rect
					width="16"
					height="20"
					x="4"
					y="2"
					rx="2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M15 2v20" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M15 7h5" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M15 12h5" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M15 17h5" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

NotebookTabs.displayName = 'NotebookTabs';
