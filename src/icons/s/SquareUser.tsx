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

const SquareUser = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					<rect width="18" height="18" x="3" y="3" rx="2" />
				</motion.g>
				<motion.circle
					cx="12"
					cy="10"
					r="3"
					variants={detailVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
					variants={detailVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

SquareUser.displayName = 'SquareUser';

export { SquareUser };
