'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const inkVariants: Variants = {
	normal: { pathLength: 1, fillOpacity: 1, strokeOpacity: 0, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1, 1],
		strokeOpacity: [1, 1, 0],
		fillOpacity: [0, 0, 1],
		transition: { duration: 0.8, times: [0, 0.6, 1], ease: 'easeInOut' },
	},
};

const Git = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"
					fill="currentColor"
					stroke="currentColor"
					strokeWidth="1"
					variants={inkVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Git.displayName = 'Git';

export { Git };
