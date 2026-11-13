'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const glyphVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const CircleLetterPOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path
					d="M9 14.657V16"
					custom={0}
					variants={glyphVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M12 12h1a2 2 0 000-4H9.5a.5.5 0 00-.5.5V9"
					custom={1}
					variants={glyphVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M15.652 21.31A10 10 0 012.691 8.348" />
				<path d="M4.929 4.929a10 10 0 0116.729 4.483 10 10 0 01-2.588 9.658" />
				<motion.path
					d="M22 22 2 2"
					custom={3}
					variants={glyphVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CircleLetterPOff.displayName = 'CircleLetterPOff';

export { CircleLetterPOff };
