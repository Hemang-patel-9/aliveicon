'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const starVariants: Variants = {
	normal: { rotate: 0, scale: 1, transition: { duration: 0.25 } },
	animate: (delay: number) => ({
		rotate: [0, 60],
		scale: [1, 0.7, 1],
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const Asterism = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	return (
		<div {...iconProps}>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				width="100%"
				height="100%"
			>
				<motion.g variants={starVariants} initial="normal" animate={controls} custom={0}>
					<path d="M12 2v8" />
					<path d="m8.5 4 7 4" />
					<path d="m8.5 8 7-4" />
				</motion.g>
				<motion.g variants={starVariants} initial="normal" animate={controls} custom={0.15}>
					<path d="M6 13v8" />
					<path d="m2.5 15 7 4" />
					<path d="m2.5 19 7-4" />
				</motion.g>
				<motion.g variants={starVariants} initial="normal" animate={controls} custom={0.3}>
					<path d="M18 13v8" />
					<path d="m14.5 15 7 4" />
					<path d="m14.5 19 7-4" />
				</motion.g>
			</svg>
		</div>
	);
});

Asterism.displayName = 'Asterism';

export { Asterism };
