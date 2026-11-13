'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon, type AnimationDefinition } from '../../lib/use-animated-icon';

const animateTarget: AnimationDefinition = (i) => ({
	pathLength: [0, 1],
	opacity: [0, 1],
	transition: {
		duration: 0.45,
		delay: i * 0.12,
		ease: 'easeInOut',
	},
});

const pathVariants = { visible: { pathLength: 1, opacity: 1 } };

const UmbrellaOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const paths = [
		'M12 2v2',
		'M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10',
		'M12 13v7a2 2 0 0 0 4 0',
		'M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51',
		'm2 2 20 20',
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

UmbrellaOff.displayName = 'UmbrellaOff';
export { UmbrellaOff };
