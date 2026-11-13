'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const Wand = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					'M15 4V2',
					'M15 16v-2',
					'M8 9h2',
					'M20 9h2',
					'M17.8 11.8 19 13',
					'M15 9h.01',
					'M17.8 6.2 19 5',
					'm3 21 9-9',
					'M12.2 6.2 11 5',
				].map((d, i) => (
					<motion.path key={i} d={d} variants={pathVariants} initial="normal" animate={controls} />
				))}
			</svg>
		</div>
	);
});

Wand.displayName = 'Wand';
