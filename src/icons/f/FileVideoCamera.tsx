'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pulseVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.15, 1, 1.15, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const FileVideoCamera = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2" />
				<path d="M14 2v5a1 1 0 0 0 1 1h5" />
				<motion.path
					d="m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157"
					variants={pulseVariants}
					style={{ originX: '0%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
				<rect width="7" height="6" x="3" y="16" rx="1" />
			</svg>
		</div>
	);
});

FileVideoCamera.displayName = 'FileVideoCamera';

export { FileVideoCamera };
