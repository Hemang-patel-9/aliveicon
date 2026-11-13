'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shovelVariants: Variants = {
	normal: { x: 0, y: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.5, 0],
		y: [0, 2, 0],
		rotate: [0, -8, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const MoundShovel = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g
					variants={shovelVariants}
					style={{ originX: '80%', originY: '10%' }}
					initial="normal"
					animate={controls}
				>
					<path d="m16 16 1.553-3.106a1 1 0 0 0-.447-1.341l-2.212-1.106a1 1 0 0 0-1.341.447l-1.193 2.387" />
					<path d="m20 3-4 8" />
					<path d="m22 4-4-2" />
				</motion.g>
				<path d="M21 21a1 1 0 0 0 .599-1.801c-1.333-.998-.992-4.21-3.599-4.199-1.271.006-1.5 1-2 1-2.5 0-3.209-4-6.5-4-5.106 0-4 5.107-7.059 7.17A1 1 0 0 0 3 21z" />
			</svg>
		</div>
	);
});

MoundShovel.displayName = 'MoundShovel';

export { MoundShovel };
