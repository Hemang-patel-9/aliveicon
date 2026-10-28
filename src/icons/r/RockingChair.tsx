'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rockingVariants: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [0, -2, 2, -1.5, 1.5, -1, 1, -0.5, 0],
		transition: {
			duration: 2,
			ease: 'easeInOut',
			times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9, 1],
		},
	},
};

const RockingChair = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
					variants={rockingVariants}
					initial="normal"
					animate={controls}
				>
					<polyline points="3.5 2 6.5 12.5 18 12.5" />
					<line x1="9.5" y1="12.5" x2="5.5" y2="20" />
					<line x1="15" y1="12.5" x2="18.5" y2="20" />
					<path d="M2.75 18a13 13 0 0 0 18.5 0" />
				</motion.svg>
			</div>
		);
	}
);

RockingChair.displayName = 'RockingChair';

export { RockingChair };
