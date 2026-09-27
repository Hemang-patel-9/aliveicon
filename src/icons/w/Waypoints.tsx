'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lineVariants = {
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

const circleVariants = {
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

export const Waypoints = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const paths = [{ d: 'm10.2 6.3-3.9 3.9' }, { d: 'M7 12h10' }, { d: 'm13.8 17.7 3.9-3.9' }];

		const circles = [
			{ cx: 12, cy: 4.5 },
			{ cx: 4.5, cy: 12 },
			{ cx: 19.5, cy: 12 },
			{ cx: 12, cy: 19.5 },
		];

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
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
							r={2.5}
							initial="normal"
							variants={circleVariants}
							animate={controls}
							custom={i}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Waypoints.displayName = 'Waypoints';
