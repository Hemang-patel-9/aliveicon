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

const ShieldCogCorner = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					<path d="M11 22c-3.806-1.45-7-3.966-7-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v4" />
					<path d="M14.923 16.547 14 16.164" />
					<path d="m14.923 18.843-.923.383" />
					<path d="M16.547 14.923 16.164 14" />
					<path d="m16.547 20.467-.383.924" />
					<path d="m18.843 14.923.383-.923" />
					<path d="m19.225 21.391-.382-.924" />
					<path d="m20.467 16.547.923-.383" />
					<path d="m20.467 18.843.923.383" />
					<circle cx="17.695" cy="17.695" r="3" />
				</motion.g>
			</svg>
		</div>
	);
});

ShieldCogCorner.displayName = 'ShieldCogCorner';

export { ShieldCogCorner };
