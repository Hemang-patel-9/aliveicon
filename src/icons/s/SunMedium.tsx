'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 90, 90, 0],
		transition: { duration: 0.8, times: [0, 0.4, 0.6, 1], ease: 'easeInOut' },
	},
};

const SunMedium = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={turnVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 3v1" />
					<path d="M12 20v1" />
					<path d="M3 12h1" />
					<path d="M20 12h1" />
					<path d="m18.364 5.636-.707.707" />
					<path d="m6.343 17.657-.707.707" />
					<path d="m5.636 5.636.707.707" />
					<path d="m17.657 17.657.707.707" />
				</motion.g>
			</svg>
		</div>
	);
});

SunMedium.displayName = 'SunMedium';

export { SunMedium };
