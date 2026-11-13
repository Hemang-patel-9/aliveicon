'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ZapOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const pathVariants: Variants = {
		normal: { pathLength: 1, opacity: 1 },
		animate: (i: number) => ({
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: {
				delay: i * 0.15,
				duration: 0.4,
				ease: 'easeInOut',
			},
		}),
	};

	const paths = [
		'M10.768 5.111 13.44 2.44a1.5 1.5 0 012.474 1.561l-1.633 4.625',
		'm18.889 13.232.672-.672A1.5 1.5 0 0018.5 10h-2.844',
		'm7.94 7.94-3.5 3.499A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l5.5-5.5',
		'm2 2 20 20',
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
				{paths.map((d, i) => (
					<motion.path
						key={i}
						d={d}
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={i}
					/>
				))}
			</svg>
		</div>
	);
});

ZapOff.displayName = 'ZapOff';
export { ZapOff };
