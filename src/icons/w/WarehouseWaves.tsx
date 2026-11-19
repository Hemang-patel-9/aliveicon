'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.12, ease: 'easeInOut' },
	}),
};

const paths = [
	'M2 11V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8v3',
	'M6 11v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
	'M2 16q2.5 2 5 0t5 0 5 0 5 0',
	'M2 21q2.5 2 5 0t5 0 5 0 5 0',
];

const WarehouseWaves = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				{paths.map((d, i) => (
					<motion.path
						key={d}
						d={d}
						variants={pathVariants}
						custom={i}
						initial="normal"
						animate={controls}
					/>
				))}
			</svg>
		</div>
	);
});

WarehouseWaves.displayName = 'WarehouseWaves';

export { WarehouseWaves };
