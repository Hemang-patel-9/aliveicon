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

const UserRoundPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = ['M2 21a8 8 0 0 1 13.292-6', 'M19 16v6', 'M22 19h-6'];

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

UserRoundPlus.displayName = 'UserRoundPlus';
export { UserRoundPlus };
