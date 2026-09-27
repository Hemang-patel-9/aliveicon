'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowHeadVariants = {
	normal: { d: 'm5 12 7-7 7 7', translateY: 0 },
	animate: {
		d: 'm5 12 7-7 7 7',
		translateY: [0, 3, 0],
		transition: {
			duration: 0.4,
			ease: 'easeInOut',
		},
	},
};

const arrowLineVariants = {
	normal: { d: 'M12 19V5' },
	animate: {
		d: ['M12 19V5', 'M12 19V10', 'M12 19V5'],
		transition: {
			duration: 0.4,
			ease: 'easeInOut',
		},
	},
};

export const ArrowUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { rest: 'initial' });

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
						d="M12 19V5"
						variants={arrowLineVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="m5 12 7-7 7 7"
						variants={arrowHeadVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowUp.displayName = 'ArrowUp';
