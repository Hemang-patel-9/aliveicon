'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const blinkVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [1, 0, 1, 0, 1],
		transition: { duration: 0.8, ease: 'linear' },
	},
};

const nudgeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Terminal = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M12 19h8" variants={blinkVariants} initial="normal" animate={controls} />
				<motion.path
					d="m4 17 6-6-6-6"
					variants={nudgeVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Terminal.displayName = 'Terminal';

export { Terminal };
