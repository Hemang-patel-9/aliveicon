'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.18, 0.96, 1],
		transition: { duration: 0.45, ease: 'easeInOut' },
	},
};

const ShowerHead = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={popVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path d="m4 4 2.5 2.5" />
					<path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
					<path d="M15 5 5 15" />
					<path d="M14 17v.01" />
					<path d="M10 16v.01" />
					<path d="M13 13v.01" />
					<path d="M16 10v.01" />
					<path d="M11 20v.01" />
					<path d="M17 14v.01" />
					<path d="M20 11v.01" />
				</motion.g>
			</svg>
		</div>
	);
});

ShowerHead.displayName = 'ShowerHead';

export { ShowerHead };
