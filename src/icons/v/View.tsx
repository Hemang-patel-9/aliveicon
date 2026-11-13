'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon, type AnimationDefinition } from '../../lib/use-animated-icon';

const animateTarget: AnimationDefinition = (i) => ({
	pathLength: [0, 1],
	opacity: [0, 1],
	transition: {
		duration: 0.5,
		delay: i * 0.1,
		ease: 'easeInOut',
	},
});

const pathVariants = { visible: { pathLength: 1, opacity: 1 } };

const View = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const paths = [
		'M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2',
		'M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2',
		'M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0',
	];

	const circles = [{ cx: 12, cy: 12, r: 1 }];

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
				{paths.map((d, i) => (
					<motion.path
						key={i}
						d={d}
						initial="visible"
						animate={controls}
						custom={i}
						variants={pathVariants}
					/>
				))}
				{circles.map((circle, i) => (
					<motion.circle
						key={`circle-${i}`}
						cx={circle.cx}
						cy={circle.cy}
						r={circle.r}
						initial="visible"
						animate={controls}
						custom={paths.length + i}
						variants={pathVariants}
					/>
				))}
			</svg>
		</div>
	);
});

View.displayName = 'View';
export { View };
