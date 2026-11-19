'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.06, ease: 'easeInOut' },
	}),
};

const dashes: [string, number][] = [
	['M12 12v3', 8],
	['M12 22v-3', 8],
	['m18.268 18.732 1.732-1a2 2 0 001-1.733V14', 2],
	['M20.7 7 18 8.552', 6],
	['M21 10V8a2 2 0 00-1-1.73l-1.732-1', 1],
	['M3 10V8a2 2 0 011-1.73l1.732-1', 5],
	['M3.3 7 6 8.552', 6],
	['m5.732 18.732-1.732-1A2 2 0 013 16v-2', 4],
	['m9.268 20.732 1.732 1a2 2 0 002-.002l1.732-.998', 3],
	['m9.268 3.27 1.732-1a2 2 0 012 0l1.732 1', 0],
	['m9.468 10.54 2.533 1.462 2.533-1.463', 7],
];

const BoxDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				{dashes.map(([d, order]) => (
					<motion.path
						key={d}
						d={d}
						variants={dashVariants}
						custom={order}
						initial="normal"
						animate={controls}
					/>
				))}
			</svg>
		</div>
	);
});

BoxDashed.displayName = 'BoxDashed';

export { BoxDashed };
