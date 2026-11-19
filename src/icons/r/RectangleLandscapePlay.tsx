'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const playVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.8, 1.1, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const RectangleLandscapePlay = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M15.033 11.44a.65.65 0 010 1.12l-4.065 2.352a.65.65 0 01-.968-.56V9.648a.65.65 0 01.967-.56z"
					style={{ originX: '50%', originY: '50%' }}
					variants={playVariants}
					initial="normal"
					animate={controls}
				/>
				<rect x="2" y="5" width="20" height="14" rx="2" />
			</svg>
		</div>
	);
});

RectangleLandscapePlay.displayName = 'RectangleLandscapePlay';

export { RectangleLandscapePlay };
