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
		delay: i * 0.08,
		ease: 'easeInOut',
	},
});

const pathVariants = { visible: { pathLength: 1, opacity: 1 } };

const VenusAndMars = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const shapes = [
		{ type: 'path', d: 'M10 20h4' },
		{ type: 'path', d: 'M12 16v6' },
		{ type: 'path', d: 'M17 2h4v4' },
		{ type: 'path', d: 'M21 2l-5.46 5.46' },
		{ type: 'circle', props: { cx: 12, cy: 11, r: 5 } },
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
				{shapes.map((shape, i) =>
					shape.type === 'path' ? (
						<motion.path
							key={i}
							d={shape.d}
							initial="visible"
							animate={controls}
							custom={i}
							variants={pathVariants}
						/>
					) : (
						<motion.circle
							key={i}
							{...shape.props}
							initial="visible"
							animate={controls}
							custom={i}
							variants={pathVariants}
						/>
					)
				)}
			</svg>
		</div>
	);
});

VenusAndMars.displayName = 'VenusAndMars';
export { VenusAndMars };
