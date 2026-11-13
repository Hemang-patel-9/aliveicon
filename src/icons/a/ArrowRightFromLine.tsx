'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const ArrowRightFromLine = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M3 5v14" />
				<motion.path d="M21 12H7" variants={arrowVariants} initial="normal" animate={controls} />
				<motion.path
					d="m15 18 6-6-6-6"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowRightFromLine.displayName = 'ArrowRightFromLine';

export { ArrowRightFromLine };
