'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bodyVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.06, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const detailVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.15 + i * 0.1, ease: 'easeInOut' },
	}),
};

const ScanQrCode = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={bodyVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path d="M17 12v4a1 1 0 0 1-1 1h-4" />
					<path d="M17 3h2a2 2 0 0 1 2 2v2" />
					<path d="M17 8V7" />
					<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
					<path d="M3 7V5a2 2 0 0 1 2-2h2" />
					<path d="M7 17h.01" />
				</motion.g>
				<motion.path
					d="M7 21H5a2 2 0 0 1-2-2v-2"
					variants={detailVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.rect
					x="7"
					y="7"
					width="5"
					height="5"
					rx="1"
					variants={detailVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ScanQrCode.displayName = 'ScanQrCode';

export { ScanQrCode };
