'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const leftBracketVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const rightBracketVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const slashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.45, ease: 'easeOut' },
	},
};

const CodeXml = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="m18 16 4-4-4-4"
					variants={rightBracketVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m6 8-4 4 4 4"
					variants={leftBracketVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m14.5 4-5 16"
					variants={slashVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

CodeXml.displayName = 'CodeXml';

export { CodeXml };
