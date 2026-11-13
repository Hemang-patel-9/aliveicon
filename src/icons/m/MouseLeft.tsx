'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeLeftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -3, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const MouseLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={nudgeLeftVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path d="M12 7.318V10" />
					<path d="M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7" />
					<circle cx="7" cy="4" r="2" />
				</motion.g>
			</svg>
		</div>
	);
});

MouseLeft.displayName = 'MouseLeft';

export { MouseLeft };
