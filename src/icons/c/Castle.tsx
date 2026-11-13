'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const Castle = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				{[
					'M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9',
					'M22 11H2',
					'M18 3v8',
					'M6 3v8',
					'M18 5H6',
					'M15 21v-3a3 3 0 0 0-6 0v3',
					'M10 5V3',
					'M14 5V3',
				].map((d, i) => (
					<motion.path key={i} d={d} variants={pathVariants} initial="normal" animate={controls} />
				))}
			</svg>
		</div>
	);
});

Castle.displayName = 'Castle';
