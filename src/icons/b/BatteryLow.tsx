'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shellVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const barVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => {
		const start = 0.5 + i * 0.3;
		return {
			opacity: [0, 0, 1],
			transition: { duration: start + 0.3, times: [0, start / (start + 0.3), 1] },
		};
	},
};

const BatteryLow = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.rect
					x="2"
					y="6"
					width="16"
					height="12"
					rx="2"
					variants={shellVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M22 14v-4" variants={shellVariants} initial="normal" animate={controls} />
				<motion.path
					d="M6 14v-4"
					custom={0}
					variants={barVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

BatteryLow.displayName = 'BatteryLow';

export { BatteryLow };
