'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const halfVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Contrast = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M12 18a6 6 0 0 0 0-12v12z"
					style={{ originX: '0%', originY: '50%' }}
					variants={halfVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Contrast.displayName = 'Contrast';

export { Contrast };
