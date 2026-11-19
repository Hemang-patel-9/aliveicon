'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const triggerVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.8, 0],
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
};

const sprayVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		opacity: [0, 1],
		transition: { duration: 0.2, delay, ease: 'easeOut' },
	}),
};

const PaintGun = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M11 10v-.172a2 2 0 0 1 .586-1.414l.828-.828A2 2 0 0 0 13 6.172V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3.172a2 2 0 0 0 .586 1.414l.828.828A2 2 0 0 1 7 9.828V10" />
				<motion.path
					d="m12 14-.81 3.242a1 1 0 0 1-.97.758H7"
					variants={triggerVariants}
					initial="normal"
					animate={controls}
				/>
				<path d="M13 12h1" />
				<motion.path
					d="M18.01 10h.01"
					variants={sprayVariants}
					custom={0.15}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M18.01 14h.01"
					variants={sprayVariants}
					custom={0.2}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M22.01 12h.01"
					variants={sprayVariants}
					custom={0.3}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M22.01 16h.01"
					variants={sprayVariants}
					custom={0.35}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M22.01 8h.01"
					variants={sprayVariants}
					custom={0.4}
					initial="normal"
					animate={controls}
				/>
				<path d="m4 14-1.845 7.379A.5.5 0 0 0 2.64 22h2.58a1 1 0 0 0 .97-.758L8 14" />
				<rect x="2" y="10" width="11" height="4" rx="1" />
			</svg>
		</div>
	);
});

PaintGun.displayName = 'PaintGun';

export { PaintGun };
