'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const stampVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.94, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const writeVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -5, 4, -2, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const PackagePen = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g variants={stampVariants} initial="normal" animate={controls}>
					<path d="M12 14.34V12l8.71-5" />
					<path d="M21 9.114V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l5.087 2.907" />
					<path d="M3.29 7 12 12" />
					<path d="m7.5 4.27 9 5.15" />
				</motion.g>
				<motion.path
					d="M16.511 21.141a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 1 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .599.626z"
					variants={writeVariants}
					style={{ originX: '0%', originY: '100%' }}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

PackagePen.displayName = 'PackagePen';

export { PackagePen };
