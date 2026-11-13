'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			delay: i * 0.1,
			ease: 'easeInOut',
		},
	}),
};

const circleVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			delay: i * 0.1 + 0.05,
			ease: 'easeOut',
		},
	}),
};

export const Waypoints = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const paths = [
		{ d: 'm10.586 5.414-5.172 5.172' },
		{ d: 'M6 12h12' },
		{ d: 'm13.414 18.586 5.172-5.172' },
	];

	const circles = [
		{ cx: 12, cy: 4 },
		{ cx: 4, cy: 12 },
		{ cx: 20, cy: 12 },
		{ cx: 12, cy: 20 },
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
				{paths.map((p, i) => (
					<motion.path
						key={`path-${i}`}
						d={p.d}
						initial="normal"
						variants={lineVariants}
						animate={controls}
						custom={i}
					/>
				))}
				{circles.map((c, i) => (
					<motion.circle
						key={`circle-${i}`}
						cx={c.cx}
						cy={c.cy}
						r={2}
						initial="normal"
						variants={circleVariants}
						animate={controls}
						custom={i}
					/>
				))}
			</svg>
		</div>
	);
});

Waypoints.displayName = 'Waypoints';
