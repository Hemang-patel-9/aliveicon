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

const SunDim = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					<path d="M12 4h.01" />
					<path d="M20 12h.01" />
					<path d="M12 20h.01" />
					<path d="M4 12h.01" />
					<path d="M17.657 6.343h.01" />
					<path d="M17.657 17.657h.01" />
					<path d="M6.343 17.657h.01" />
					<path d="M6.343 6.343h.01" />
				</motion.g>
			</svg>
		</div>
	);
});

SunDim.displayName = 'SunDim';

export { SunDim };
