'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const barVariants: Variants = {
	normal: (y2: number) => ({
		y1: y2,
		y2: 21,
		transition: { duration: 0.3 },
	}),
	animate: (y2: number) => ({
		y1: [21, y2],
		y2: 21,
		transition: { duration: 0.6, ease: 'easeInOut' },
	}),
};

export const ChartNoAxesColumnIncreasing = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						x1="5"
						x2="5"
						y1="15"
						y2="21"
						custom={15}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="12"
						x2="12"
						y1="9"
						y2="21"
						custom={9}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="19"
						x2="19"
						y1="3"
						y2="21"
						custom={3}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartNoAxesColumnIncreasing.displayName = 'ChartNoAxesColumnIncreasing';
