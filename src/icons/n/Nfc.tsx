'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const Nfc = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
				>
					<motion.path
						d="M6 8.32a7.43 7.43 0 0 1 0 7.36"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16.37 2a20.16 20.16 0 0 1 0 20"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Nfc.displayName = 'Nfc';
