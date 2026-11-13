'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const ShelvingUnit = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"
					variants={drawVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M20 22V2"
					variants={drawVariants}
					custom={2}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4 12h16"
					variants={drawVariants}
					custom={3}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4 20h16"
					variants={drawVariants}
					custom={4}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4 2v20"
					variants={drawVariants}
					custom={5}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4 4h16"
					variants={drawVariants}
					custom={6}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ShelvingUnit.displayName = 'ShelvingUnit';

export { ShelvingUnit };
