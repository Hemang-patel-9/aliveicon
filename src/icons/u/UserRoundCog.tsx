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

const UserRoundCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const paths = [
		'm14.305 19.53.923-.382',
		'm15.228 16.852-.923-.383',
		'm16.852 15.228-.383-.923',
		'm16.852 20.772-.383.924',
		'm19.148 15.228.383-.923',
		'm19.53 21.696-.382-.924',
		'M2 21a8 8 0 0 1 10.434-7.62',
		'm20.772 16.852.924-.383',
		'm20.772 19.148.924.383',
	];

	const circles = [
		{ cx: 10, cy: 8, r: 5 },
		{ cx: 18, cy: 18, r: 3 },
	];

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

UserRoundCog.displayName = 'UserRoundCog';
export { UserRoundCog };
