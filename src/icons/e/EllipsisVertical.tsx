'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const EllipsisVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.circle
					cx="12"
					cy="12"
					r="1"
					variants={popVariants}
					initial="normal"
					animate={controls}
					custom={1}
				/>
				<motion.circle
					cx="12"
					cy="5"
					r="1"
					variants={popVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				<motion.circle
					cx="12"
					cy="19"
					r="1"
					variants={popVariants}
					initial="normal"
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

EllipsisVertical.displayName = 'EllipsisVertical';

export { EllipsisVertical };
