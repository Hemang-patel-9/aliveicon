'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tipVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -12, 8, -4, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Cap = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				style={{ overflow: 'visible' }}
			>
				<motion.g
					style={{ originX: '50%', originY: '100%' }}
					variants={tipVariants}
					initial="normal"
					animate={controls}
				>
					<path d="M11.04 4.017a12 12 0 00-2.631 11.101" />
					<path d="M5 16c3.298 0 6-3 10-3a8 8 0 016.81 3.799 1.33 1.33 0 01.19.701.5.5 0 01-.5.5c-.732.001-2.04-1.004-3.5-1-3.005.008-5.197 2.982-8 3-2.761 0-5-1.79-5-4-1.5 0-2.543-.664-2.713-1.3A8.5 8.5 0 1119 12.5a8.6 8.6 0 01-.131 1.496" />
				</motion.g>
			</svg>
		</div>
	);
});

Cap.displayName = 'Cap';

export { Cap };
