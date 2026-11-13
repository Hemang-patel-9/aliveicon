'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const foldBottomVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const foldTopVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const FoldVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g variants={foldBottomVariants} initial="normal" animate={controls}>
					<path d="M12 22v-6" />
					<path d="m15 19-3-3-3 3" />
				</motion.g>
				<motion.g variants={foldTopVariants} initial="normal" animate={controls}>
					<path d="M12 8V2" />
					<path d="m15 5-3 3-3-3" />
				</motion.g>
				<path d="M4 12H2" />
				<path d="M10 12H8" />
				<path d="M16 12h-2" />
				<path d="M22 12h-2" />
			</svg>
		</div>
	);
});

FoldVertical.displayName = 'FoldVertical';

export { FoldVertical };
