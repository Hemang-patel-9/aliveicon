'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const Jacket = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M11 2a3 3 0 00-3 3c0 2.6 4 4.4 4 7 0-2.6 4-4.4 4-7a3 3 0 00-3-3" />
				<motion.path
					d="M12 12v10"
					variants={drawVariants}
					custom={[0, 1, 0.45]}
					initial="normal"
					animate={controls}
				/>
				<path d="M18 10v10a2 2 0 01-2 2H8a2 2 0 01-2-2V10" />
				<motion.path
					d="M18 17h-2"
					variants={drawVariants}
					custom={[0.35, 0, 0.25]}
					initial="normal"
					animate={controls}
				/>
				<path d="M18 20h3a1 1 0 001-1V9a7 7 0 00-7-7H9a7 7 0 00-7 7v10a1 1 0 001 1h3" />
				<motion.path
					d="M6 17h2"
					variants={drawVariants}
					custom={[0.35, 0, 0.25]}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Jacket.displayName = 'Jacket';

export { Jacket };
