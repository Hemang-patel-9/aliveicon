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

const Repeat2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const paths = [
		'M2 9l3-3 3 3',
		'M13 18H7a2 2 0 0 1-2-2V6',
		'M22 15l-3 3-3-3',
		'M11 6h6a2 2 0 0 1 2 2v10',
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
			</svg>
		</div>
	);
});

Repeat2.displayName = 'Repeat2';
export { Repeat2 };
