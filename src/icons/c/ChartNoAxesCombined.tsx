'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const ChartNoAxesCombined = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	(props, ref) => {
		const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { rest: 'initial' });

		const barVariants: Variants = {
			initial: (y1: number) => ({ y1, y2: 21 }),
			animate: (y1: number) => ({
				y1: [21, y1],
				y2: 21,
				transition: { duration: 0.5 },
			}),
		};

		const pathVariants: Variants = {
			initial: { pathLength: 1 },
			animate: {
				pathLength: [0, 1],
				transition: { duration: 0.6, ease: 'easeInOut' },
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
					<motion.line
						x1="12"
						x2="12"
						y1="16"
						y2="21"
						custom={16}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="16"
						x2="16"
						y1="14.639"
						y2="21"
						custom={14.639}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="20"
						x2="20"
						y1="10.656"
						y2="21"
						custom={10.656}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="4"
						x2="4"
						y1="18.463"
						y2="21"
						custom={18.463}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="8"
						x2="8"
						y1="14.656"
						y2="21"
						custom={14.656}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartNoAxesCombined.displayName = 'ChartNoAxesCombined';
