'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const BellPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const swingVariants = {
			normal: { rotate: 0 },
			animate: {
				rotate: [0, 15, -10, 12, -8, 6, 0],
				transition: { duration: 1.2, ease: 'easeInOut' },
			},
		};

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<motion.svg
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
					animate={controls}
					initial="normal"
					variants={swingVariants}
					style={{ originX: '50%', originY: '0%' }}
				>
					<path d="M10.268 21a2 2 0 0 0 3.464 0" />
					<path d="M15 8h6" />
					<path d="M18 5v6" />
					<path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332" />
				</motion.svg>
			</div>
		);
	}
);

BellPlus.displayName = 'BellPlus';
