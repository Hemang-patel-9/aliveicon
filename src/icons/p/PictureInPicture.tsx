'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		y: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const pressVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.9, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const PictureInPicture = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g variants={nudgeVariants} initial="normal" animate={controls}>
					<path d="M2 10h6V4" />
					<path d="m2 4 6 6" />
				</motion.g>
				<path d="M21 10V7a2 2 0 0 0-2-2h-7" />
				<path d="M3 14v2a2 2 0 0 0 2 2h3" />
				<motion.rect
					x="12"
					y="14"
					width="10"
					height="7"
					rx="1"
					variants={pressVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

PictureInPicture.displayName = 'PictureInPicture';

export { PictureInPicture };
