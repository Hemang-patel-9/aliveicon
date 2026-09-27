'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const DURATION = 0.7;

const faceVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 1.1, 0.95, 1.1, 1],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const eyebrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [-1, -3, -1],
		transition: { duration: DURATION, ease: 'easeOut' },
	},
};

const eyeVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 0.6, 1.2, 1],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const mouthVariants: Variants = {
	normal: { x: 0 },
	animate: {
		x: [-0.5, 0.5, -0.3, 0],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const Angry = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<motion.svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial="normal"
					animate={controls}
				>
					<motion.circle cx="12" cy="12" r="10" variants={faceVariants} />
					<motion.path d="M16 16s-1.5-2-4-2-4 2-4 2" variants={mouthVariants} />
					<motion.path d="M7.5 8 10 9" variants={eyebrowVariants} />
					<motion.path d="m14 9 2.5-1" variants={eyebrowVariants} />
					<motion.path d="M9 10h.01" variants={eyeVariants} />
					<motion.path d="M15 10h.01" variants={eyeVariants} />
				</motion.svg>
			</div>
		);
	}
);

Angry.displayName = 'Angry';

export { Angry };
