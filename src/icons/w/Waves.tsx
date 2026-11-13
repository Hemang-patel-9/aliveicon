'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const waveVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			delay: i * 0.15,
			ease: 'easeInOut',
		},
	}),
};

export const Waves = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const wavePaths = [
		'M2 5q2.5 2 5 0t5 0 5 0 5 0',
		'M2 12q2.5 2 5 0t5 0 5 0 5 0',
		'M2 19q2.5 2 5 0t5 0 5 0 5 0',
	];

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
				{wavePaths.map((d, i) => (
					<motion.path
						key={i}
						d={d}
						variants={waveVariants}
						initial="normal"
						animate={controls}
						custom={i}
					/>
				))}
			</svg>
		</div>
	);
});

Waves.displayName = 'Waves';
