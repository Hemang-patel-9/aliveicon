'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const FolderNetwork = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M12 14v4"
					variants={drawVariants}
					custom={[0, 0, 0.25]}
					initial="normal"
					animate={controls}
				/>
				<path d="M17 4a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h2.5a1.5 1.5 0 011.2.6l.6.8a1.5 1.5 0 001.2.6z" />
				<motion.path
					d="M21 20h-7"
					variants={drawVariants}
					custom={[0.4, 1, 0.3]}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M3 20h7"
					variants={drawVariants}
					custom={[0.4, 1, 0.3]}
					initial="normal"
					animate={controls}
				/>
				<motion.circle
					cx="12"
					cy="20"
					r="2"
					variants={drawVariants}
					custom={[0.2, 0, 0.3]}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

FolderNetwork.displayName = 'FolderNetwork';

export { FolderNetwork };
