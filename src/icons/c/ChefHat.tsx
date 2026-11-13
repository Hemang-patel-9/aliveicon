'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const ChefHat = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, { rest: 'initial' });

	const pathVariants: Variants = {
		initial: { pathLength: 1 },
		animate: {
			pathLength: [0, 1],
			transition: { duration: 0.4, ease: 'easeInOut' },
		},
	};

	return (
		<div {...iconProps}>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M6 12.65c0-.457-.316-.844-.727-1.041A4 4 0 017.52 4.034a1.53 1.53 0 001.367-.547 4 4 0 016.225 0 1.53 1.53 0 001.367.547 4 4 0 012.248 7.575c-.411.197-.727.584-.727 1.04V19a2 2 0 01-2 2H8a2 2 0 01-2-2z"
					variants={pathVariants}
					initial="initial"
					animate={controls}
				/>
				<motion.path d="M6 16h12" variants={pathVariants} initial="initial" animate={controls} />
				<motion.path d="M10 11v5" variants={pathVariants} initial="initial" animate={controls} />
				<motion.path d="M14 11v5" variants={pathVariants} initial="initial" animate={controls} />
			</svg>
		</div>
	);
});

ChefHat.displayName = 'ChefHat';
