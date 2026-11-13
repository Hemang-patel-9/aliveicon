'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeDownVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 3, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const LayoutArrowDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={nudgeDownVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<rect width="7" height="7" x="3" y="3" rx="1" />
					<rect width="7" height="7" x="3" y="14" rx="1" />
					<path d="M18 3v18" />
					<path d="m21 18-3 3-3-3" />
				</motion.g>
			</svg>
		</div>
	);
});

LayoutArrowDown.displayName = 'LayoutArrowDown';

export { LayoutArrowDown };
