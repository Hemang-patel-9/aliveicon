'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const hookVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.4, 1.6, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.45, ease: 'easeOut' },
	},
};

const CircleQuestionMark = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<circle cx="12" cy="12" r="10" />
				<motion.path
					d="M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"
					variants={hookVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M12 17h.01" variants={dotVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

CircleQuestionMark.displayName = 'CircleQuestionMark';

export { CircleQuestionMark };
