'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
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

const pathVariants = { visible: { pathLength: 1, opacity: 1 } };

const UsersRound = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const paths = ['M18 21a8 8 0 0 0-16 0', 'M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3'];

	const circles = [{ cx: 10, cy: 8, r: 5 }];

	return (
		<div {...iconProps}>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
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
						variants={pathVariants}
					/>
				))}
				{paths.map((d, i) => (
					<motion.path
						key={`path-${i}`}
						d={d}
						initial="visible"
						animate={controls}
						custom={i + circles.length}
						variants={pathVariants}
					/>
				))}
			</svg>
		</div>
	);
});

UsersRound.displayName = 'UsersRound';
export { UsersRound };
