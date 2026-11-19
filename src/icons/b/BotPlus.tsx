'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const eyeVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5 },
	},
};

const blinkVariants: Variants = {
	normal: { scaleY: 1 },
	animate: {
		scaleY: [1, 0.1, 1],
		transition: { duration: 0.5, delay: 0.5, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const BotPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="M12 8V4H8" />
				<motion.path
					d="M15 13v2"
					style={{ originX: '50%', originY: '50%' }}
					variants={blinkVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M19 16v6"
					variants={drawVariants}
					custom={[0.35, 0.5, 0.35]}
					initial="normal"
					animate={controls}
				/>
				<path d="M2 14h2" />
				<path d="M20 12v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6" />
				<motion.path
					d="M22 19h-6"
					variants={drawVariants}
					custom={[0.2, 0.5, 0.35]}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M9 13v2" variants={eyeVariants} initial="normal" animate={controls} />
			</svg>
		</div>
	);
});

BotPlus.displayName = 'BotPlus';

export { BotPlus };
