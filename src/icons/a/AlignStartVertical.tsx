'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: (i: number) => ({
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.4,
			delay: i * 0.3,
		},
	}),
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			delay: i * 0.3,
		},
	}),
};

const rectVariants = {
	normal: (i: number) => ({
		scaleX: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: i * 0.3 + 0.3,
		},
	}),
	animate: (i: number) => ({
		scaleX: [0, 1],
		opacity: [0, 1],
		originX: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
			delay: i * 0.4 + 0.1,
		},
	}),
};

export const AlignStartVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	(props, ref) => {
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
						d="M2 2v20"
						variants={pathVariants}
						custom={0}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="16"
						height="6"
						x="6"
						y="4"
						rx="2"
						variants={rectVariants}
						custom={0}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="9"
						height="6"
						x="6"
						y="14"
						rx="2"
						variants={rectVariants}
						custom={1}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

AlignStartVertical.displayName = 'AlignStartVertical';
