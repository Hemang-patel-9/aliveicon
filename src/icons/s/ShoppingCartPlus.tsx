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

const ShoppingCartPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					<path d="M16 5h6" />
					<path d="M19 2v6" />
					<path d="m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18" />
					<path d="M4.564 5H12" />
					<path d="M6.25 14h12.712a2 2 0 001.991-1.57l.172-1.041" />
				</motion.g>
				<motion.circle
					cx="18"
					cy="20"
					r="2"
					variants={detailVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="8"
					cy="20"
					r="2"
					variants={detailVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ShoppingCartPlus.displayName = 'ShoppingCartPlus';

export { ShoppingCartPlus };
