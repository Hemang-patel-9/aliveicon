'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turnVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 0.3, 1, 0.3, 1],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const Faucet = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={turnVariants} initial="normal" animate={controls}>
						<path d="M10.083 5.428 5.57 4.083a2 2 0 10.001 3.834l4.512-1.345" />
						<path d="m13.917 5.428 4.511-1.345a2 2 0 110 3.834l-4.51-1.345" />
						<circle cx="12" cy="6" r="2" />
					</motion.g>
					<path d="M12 8v3" />
					<path d="M18 17v-4.006" />
					<path d="M22 11v8" />
					<path d="M22 12h-3a1 1 0 00-1 .994h-2.539a4 4 0 00-6.915-.012L7 13a5 5 0 00-5 5v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 01.995-1l1.552.018a4 4 0 006.907 0L18 17a1 1 0 001 1h3" />
				</svg>
			</div>
		);
	}
);

Faucet.displayName = 'Faucet';

export { Faucet };
