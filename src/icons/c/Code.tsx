'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const leftBracketVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const rightBracketVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Code = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m16 18 6-6-6-6"
					variants={rightBracketVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m8 6-6 6 6 6"
					variants={leftBracketVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Code.displayName = 'Code';

export { Code };
