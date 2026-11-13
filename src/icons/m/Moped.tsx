'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lurchVariants: Variants = {
	normal: { rotate: 0, x: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -7, -7, 0],
		x: [0, 1.5, 1.5, 0],
		transition: { duration: 0.7, times: [0, 0.35, 0.6, 1], ease: 'easeInOut' },
	},
};

const Moped = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g
					variants={lurchVariants}
					style={{ originX: 0.15, originY: 1 }}
					initial="normal"
					animate={controls}
				>
					<path d="m18.16 14.12-2.927-8.447A1 1 0 0 0 14.288 5H13" />
					<path d="M19 10a7 7 0 0 0-6.928 6" />
					<path d="M2 10h5.5a3 3 0 0 1 2.747 1.795l1.669 3.803A1 1 0 0 1 11.01 17H8" />
					<circle cx="19" cy="17" r="3" />
					<circle cx="5" cy="17" r="3" />
				</motion.g>
			</svg>
		</div>
	);
});

Moped.displayName = 'Moped';

export { Moped };
