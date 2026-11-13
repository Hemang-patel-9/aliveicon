'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const scanVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.5, 1, 0],
		y: [0, -1.5, 1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const SquareDashedSearch = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M14 3h1" />
				<path d="M19 3a2 2 0 012 2" />
				<path d="M21 9v1" />
				<path d="M3 14v1" />
				<path d="M3 9v1" />
				<path d="M5 21a2 2 0 01-2-2" />
				<path d="M5 3a2 2 0 00-2 2" />
				<path d="M9 21h1" />
				<path d="M9 3h1" />
				<motion.g variants={scanVariants} initial="normal" animate={controls}>
					<path d="m21 21-1.875-1.875" />
					<circle cx="17" cy="17" r="3" />
				</motion.g>
			</svg>
		</div>
	);
});

SquareDashedSearch.displayName = 'SquareDashedSearch';

export { SquareDashedSearch };
