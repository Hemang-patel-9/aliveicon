'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const cardVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const GalleryHorizontalEnd = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M2 7v10"
					variants={drawVariants}
					custom={0.2}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M6 5v14"
					variants={drawVariants}
					custom={0.1}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					width="12"
					height="18"
					x="10"
					y="3"
					rx="2"
					variants={cardVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

GalleryHorizontalEnd.displayName = 'GalleryHorizontalEnd';

export { GalleryHorizontalEnd };
