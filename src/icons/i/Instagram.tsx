'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lensVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.7, 1.1, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const flashVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0, 1.5, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.25, ease: 'easeOut' },
	},
};

const Instagram = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
				<motion.path
					d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
					variants={lensVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
				<motion.line
					x1="17.5"
					x2="17.51"
					y1="6.5"
					y2="6.5"
					variants={flashVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Instagram.displayName = 'Instagram';

export { Instagram };
