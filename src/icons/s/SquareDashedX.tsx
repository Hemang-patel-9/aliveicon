'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bodyVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.06, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const detailVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.15 + i * 0.1, ease: 'easeInOut' },
	}),
};

const SquareDashedX = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={bodyVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path d="M14 21h1" />
					<path d="M14 3h1" />
					<path d="M19 3a2 2 0 012 2" />
					<path d="M21 14v1" />
					<path d="M21 19a2 2 0 01-2 2" />
					<path d="M21 9v1" />
					<path d="M3 14v1" />
					<path d="M3 9v1" />
					<path d="M5 21a2 2 0 01-2-2" />
					<path d="M5 3a2 2 0 00-2 2" />
					<path d="m9 15 6-6" />
					<path d="M9 21h1" />
				</motion.g>
				<motion.path
					d="M9 3h1"
					variants={detailVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m9 9 6 6"
					variants={detailVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

SquareDashedX.displayName = 'SquareDashedX';

export { SquareDashedX };
