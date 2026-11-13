'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const blockVariants: Variants = {
	normal: {
		x: 0,
		y: 0,
		transition: { type: 'spring', stiffness: 200, damping: 10 },
	},
	animate: {
		x: 2,
		y: -2,
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const Blocks = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.rect
					x="14"
					y="2"
					width="8"
					height="8"
					rx="1"
					variants={blockVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
			</svg>
		</div>
	);
});

Blocks.displayName = 'Blocks';

export { Blocks };
