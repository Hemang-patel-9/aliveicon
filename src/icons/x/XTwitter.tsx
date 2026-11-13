'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const logoVariants: Variants = {
	normal: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [0, 1],
		scale: [0.8, 1.06, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const XTwitter = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"
					fill="currentColor"
					stroke="none"
					variants={logoVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

XTwitter.displayName = 'XTwitter';
