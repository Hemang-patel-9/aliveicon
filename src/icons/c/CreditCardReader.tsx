'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cardVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -2, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const CreditCardReader = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={cardVariants} initial="normal" animate={controls}>
						<path d="M15 16v1" />
						<path d="M16.963 7.734A1 1 0 0015.999 7H8.003a1 1 0 00-.964.734L4.073 18.467A2 2 0 006 21h12a2 2 0 001.927-2.532z" />
						<path d="m9 21 2-14" />
					</motion.g>
					<path d="M2.678 8.5A2 2 0 012 7V5a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 01-.676 1.499" />
				</svg>
			</div>
		);
	}
);

CreditCardReader.displayName = 'CreditCardReader';

export { CreditCardReader };
