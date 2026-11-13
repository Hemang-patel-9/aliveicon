'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathMotion: Variants = {
	normal: {
		translateX: 0,
	},
	animate: {
		translateX: [0, 3, -3, 2, -2, 0],
		transition: {
			ease: 'linear',
			duration: 1,
		},
	},
};

export const AlignCenter = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M17 12H7" variants={pathMotion} initial="normal" animate={controls} />
				<path d="M19 19H5" />
				<path d="M21 5H3" />
			</svg>
		</div>
	);
});

AlignCenter.displayName = 'AlignCenter';
