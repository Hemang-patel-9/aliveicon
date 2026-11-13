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
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const ClipboardList = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.rect
					x="8"
					y="2"
					width="8"
					height="4"
					rx="1"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M12 11h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M12 16h4" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M8 11h.01" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M8 16h.01" variants={pathVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

ClipboardList.displayName = 'ClipboardList';
