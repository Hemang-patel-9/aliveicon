'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const BellMinus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12" />
				</motion.svg>
			</div>
		);
	}
);

BellMinus.displayName = 'BellMinus';
