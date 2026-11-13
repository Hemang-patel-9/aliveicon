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
		delay: i * 0.08,
		ease: 'easeInOut',
	},
});

const pathVariants = { visible: { pathLength: 1, opacity: 1 } };

const Vault = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		rest: 'visible',
		animate: animateTarget,
	});

	const animatedPaths = [
		'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
		'M7.9 7.9l2.7 2.7',
		'M13.4 10.6l2.7-2.7',
		'M7.9 16.1l2.7-2.7',
		'M13.4 13.4l2.7 2.7',
		'M12 10a2 2 0 1 0 0 4a2 2 0 0 0 0-4',
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
				<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
				<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
				<circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
				<circle cx="16.5" cy="16.5" r=".5" fill="currentColor" />

				{animatedPaths.map((d, i) => (
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

Vault.displayName = 'Vault';
export { Vault };
