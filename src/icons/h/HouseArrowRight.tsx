'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const HouseArrowRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M12.353 21H5a2 2 0 01-2-2v-9a2 2 0 01.709-1.528l7-6a2 2 0 012.582 0l7 6A2 2 0 0121 10v2.344" />
				<path d="M14.87 12.508A1 1 0 0014 12h-4a1 1 0 00-1 1v8" />
				<motion.path
					d="m17.999 21 3-3h-6"
					variants={rightVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m20.999 18-3-3"
					variants={rightVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

HouseArrowRight.displayName = 'HouseArrowRight';

export { HouseArrowRight };
