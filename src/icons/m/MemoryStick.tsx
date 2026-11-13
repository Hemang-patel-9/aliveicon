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

const MemoryStick = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					<path d="M12 12v-2" />
					<path d="M12 18v-2" />
					<path d="M16 12v-2" />
					<path d="M16 18v-2" />
					<path d="M2 11h1.5" />
					<path d="M20 18v-2" />
					<path d="M20.5 11H22" />
					<path d="M4 18v-2" />
					<path d="M8 12v-2" />
					<path d="M8 18v-2" />
					<rect x="2" y="6" width="20" height="10" rx="2" />
				</motion.g>
			</svg>
		</div>
	);
});

MemoryStick.displayName = 'MemoryStick';

export { MemoryStick };
