'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const liftVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const grooveVariants: Variants = {
	normal: { y: 0, pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const ChocolateBar = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				style={{ overflow: 'visible' }}
			>
				<motion.path d="M12 2v10" variants={grooveVariants} initial="normal" animate={controls} />
				<motion.path
					d="M17 12V4.4a.4.4 0 00-.4-.4A1.6 1.6 0 0115 2.4a.4.4 0 00-.4-.4H9a2 2 0 00-2 2v8"
					variants={liftVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M5 14a2 2 0 012-2h10a2 2 0 012 2v2a1 1 0 01-1 1 2 2 0 01-.9-.203l-1.2-.594a2 2 0 00-1.8 0l-1.2.594a2 2 0 01-1.8 0l-1.2-.594a2 2 0 00-1.8 0l-1.2.594a2 2 0 01-.9.198A1 1 0 015 16z" />
				<path d="M7 16.748V20a2 2 0 002 2h6a2 2 0 002-2v-3.252" />
				<motion.path d="M7 7h10" variants={grooveVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

ChocolateBar.displayName = 'ChocolateBar';

export { ChocolateBar };
