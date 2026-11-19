'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const spinVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 360],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const UserRoundClock = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path
					d="M17 15.5v1.7l1 .625"
					variants={spinVariants}
					style={{ originX: '0%', originY: '64.5%' }}
					initial="normal"
					animate={controls}
				/>
				<path d="M2 21a8 8 0 016.898-7.924" />
				<path d="M8.987 12.897a5 5 0 116.008-4.673" />
				<circle cx="17" cy="17" r="5" />
			</svg>
		</div>
	);
});

UserRoundClock.displayName = 'UserRoundClock';

export { UserRoundClock };
