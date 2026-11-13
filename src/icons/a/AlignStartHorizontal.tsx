'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
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

const rectVariants: Variants = {
	normal: (i: number) => ({
		scaleY: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: i * 0.3 + 0.3,
		},
	}),
	animate: (i: number) => ({
		scaleY: [0, 1],
		opacity: [0, 1],
		originY: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
			delay: i * 0.4 + 0.1,
		},
	}),
};

export const AlignStartHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M22 2H2"
						variants={pathVariants}
						custom={0}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="6"
						height="16"
						x="4"
						y="6"
						rx="2"
						variants={rectVariants}
						custom={0}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="6"
						height="9"
						x="14"
						y="6"
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

AlignStartHorizontal.displayName = 'AlignStartHorizontal';
