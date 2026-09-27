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

const UserCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = [
			'M10 15H6a4 4 0 0 0-4 4v2',
			'm14.305 16.53.923-.382',
			'm15.228 13.852-.923-.383',
			'm16.852 12.228-.383-.923',
			'm16.852 17.772-.383.924',
			'm19.148 12.228.383-.923',
			'm19.53 18.696-.382-.924',
			'm20.772 13.852.924-.383',
			'm20.772 16.148.924.383',
		];

		const circles = [
			{ cx: 18, cy: 15, r: 3 },
			{ cx: 9, cy: 7, r: 4 },
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

UserCog.displayName = 'UserCog';
export { UserCog };
