'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const ArrowUpFromLine = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m18 9-6-6-6 6"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M12 3v14" variants={arrowVariants} initial="normal" animate={controls} />
				<path d="M5 21h14" />
			</svg>
		</div>
	);
});

ArrowUpFromLine.displayName = 'ArrowUpFromLine';

export { ArrowUpFromLine };
