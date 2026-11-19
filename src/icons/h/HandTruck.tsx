'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tiltVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 3, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const HandTruck = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					style={{ originX: '40%', originY: '90%' }}
					variants={tiltVariants}
					initial="normal"
					animate={controls}
				>
					<path d="m15.614 7.108-2.115-4.53a1 1 0 0 0-1.329-.484l-2.3 1.073a1 1 0 0 0-.484 1.33l4.783 10.247a1 1 0 0 0 1.329.483l5.925-2.765a1 1 0 0 0 .483-1.329l-2.245-4.81a1 1 0 0 0-1.329-.484l-6.831 3.188" />
					<path d="M2 3.268a2 2 0 0 1 2.812.886l7 15a2 2 0 0 0 2.659.967L20 17.54" />
					<circle cx="10" cy="20" r="2" />
				</motion.g>
			</svg>
		</div>
	);
});

HandTruck.displayName = 'HandTruck';

export { HandTruck };
