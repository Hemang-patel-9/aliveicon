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

const SquareScissors = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					<path d="m17 17-2.18-2.18" />
					<path d="M9.56 14.44 17 7" />
					<path d="M9.56 9.56 12 12" />
					<circle cx="8.5" cy="15.5" r="1.5" />
					<circle cx="8.5" cy="8.5" r="1.5" />
					<rect x="3" y="3" width="18" height="18" rx="2" />
				</motion.g>
			</svg>
		</div>
	);
});

SquareScissors.displayName = 'SquareScissors';

export { SquareScissors };
