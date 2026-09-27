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
		delay: i * 0.08,
		ease: 'easeInOut',
	},
});

const Usb = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = [
			'M4.7 19.3 19 5',
			'm21 3-3 1 2 2Z',
			'M9.26 7.68 5 12l2 5',
			'm10 14 5 2 3.5-3.5',
			'm18 12 1-1 1 1-1 1Z',
		];

		const circles = [
			{ cx: 10, cy: 7, r: 1 },
			{ cx: 4, cy: 20, r: 1 },
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

Usb.displayName = 'Usb';
export { Usb };
