'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const CircleChevronRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	(props, ref) => {
		const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { rest: 'initial' });

		const motionVariants: Variants = {
			initial: { x: 0 },
			animate: {
				x: [0, 4, 0],
				transition: {
					duration: 0.5,
					ease: 'easeInOut',
				},
			},
		};

		return (
			<div {...iconProps}>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<motion.path
						d="m10 8 4 4-4 4"
						variants={motionVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleChevronRight.displayName = 'CircleChevronRight';
