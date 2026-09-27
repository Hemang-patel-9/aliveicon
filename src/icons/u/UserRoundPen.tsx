'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon, type AnimationDefinition } from '../../lib/use-animated-icon';

const animateTarget: AnimationDefinition = (i) => ({
	pathLength: [0, 1],
	opacity: [0, 1],
	transition: {
		duration: 0.4,
		delay: i * 0.1,
		ease: 'easeInOut',
	},
});

const UserRoundPen = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = [
			'M2 21a8 8 0 0 1 10.821-7.487',
			'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
		];

		const circles = [{ cx: 10, cy: 8, r: 5 }];

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{circles.map((c, i) => (
						<motion.circle
							key={`circle-${i}`}
							cx={c.cx}
							cy={c.cy}
							r={c.r}
							initial="visible"
							animate={controls}
							custom={i}
							variants={{
								visible: {
									pathLength: 1,
									opacity: 1,
								},
							}}
						/>
					))}
					{paths.map((d, i) => (
						<motion.path
							key={`path-${i}`}
							d={d}
							initial="visible"
							animate={controls}
							custom={i + circles.length}
							variants={{
								visible: {
									pathLength: 1,
									opacity: 1,
								},
							}}
						/>
					))}
				</svg>
			</div>
		);
	}
);

UserRoundPen.displayName = 'UserRoundPen';
export { UserRoundPen };
