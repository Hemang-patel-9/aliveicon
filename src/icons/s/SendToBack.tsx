'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeRightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 3, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const SendToBack = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={nudgeRightVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<rect x="14" y="14" width="8" height="8" rx="2" />
					<rect x="2" y="2" width="8" height="8" rx="2" />
					<path d="M7 14v1a2 2 0 0 0 2 2h1" />
					<path d="M14 7h1a2 2 0 0 1 2 2v1" />
				</motion.g>
			</svg>
		</div>
	);
});

SendToBack.displayName = 'SendToBack';

export { SendToBack };
