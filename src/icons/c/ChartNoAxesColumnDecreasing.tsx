'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const barVariants: Variants = {
	normal: (custom: number) => ({
		y1: custom,
		y2: 20,
		transition: { duration: 0.3 },
	}),
	animate: (custom: number) => ({
		y1: [20, custom],
		y2: 20,
		transition: { duration: 0.6, ease: 'easeInOut' },
	}),
};

export const ChartNoAxesColumnDecreasing = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.line
						x1="6"
						x2="6"
						custom={4}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="12"
						x2="12"
						custom={10}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="18"
						x2="18"
						custom={16}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartNoAxesColumnDecreasing.displayName = 'ChartNoAxesColumnDecreasing';
