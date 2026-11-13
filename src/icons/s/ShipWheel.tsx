'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tiltVariants: Variants = {
	normal: { rotate: 0, scale: 1, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 6, 0],
		scale: [1, 1.06, 1.06, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const ShipWheel = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={tiltVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<circle cx="12" cy="12" r="8" />
					<path d="M12 2v7.5" />
					<path d="m19 5-5.23 5.23" />
					<path d="M22 12h-7.5" />
					<path d="m19 19-5.23-5.23" />
					<path d="M12 14.5V22" />
					<path d="M10.23 13.77 5 19" />
					<path d="M9.5 12H2" />
					<path d="M10.23 10.23 5 5" />
					<circle cx="12" cy="12" r="2.5" />
				</motion.g>
			</svg>
		</div>
	);
});

ShipWheel.displayName = 'ShipWheel';

export { ShipWheel };
