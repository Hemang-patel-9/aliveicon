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

const Underline = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const elements = [
		{ tag: 'path', props: { d: 'M6 4v6a6 6 0 0 0 12 0V4' } },
		{ tag: 'line', props: { x1: 4, x2: 20, y1: 20, y2: 20 } },
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
				{elements.map((el, i) => {
					const Comp = motion[el.tag as 'path' | 'line'];
					return (
						<Comp
							key={i}
							{...el.props}
							initial="visible"
							animate={controls}
							custom={i}
							variants={pathVariants}
						/>
					);
				})}
			</svg>
		</div>
	);
});

Underline.displayName = 'Underline';
export { Underline };
