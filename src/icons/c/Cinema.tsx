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

const seatVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		y: [0, -1, 0],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const Cinema = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M14 22a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"
					variants={seatVariants}
					custom={0.4}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M15.03 8.44a.65.65 0 0 1 0 1.12l-4.06 2.35a.64.64 0 0 1-.97-.56v-4.7a.647.647 0 0 1 .96-.56z"
					style={{ originX: '50%', originY: '50%' }}
					variants={playVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M2 22a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"
					variants={seatVariants}
					custom={0.3}
					initial="normal"
					animate={controls}
				/>
				<rect x="2" y="2" width="20" height="14" rx="2" />
			</svg>
		</div>
	);
});

Cinema.displayName = 'Cinema';

export { Cinema };
