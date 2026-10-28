'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cardVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.25 } },
	animate: {
		rotate: [0, -6, 4, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const CreditCard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						<rect width="20" height="14" x="2" y="5" rx="2" />
						<motion.line
							x1="2"
							x2="22"
							y1="10"
							y2="10"
							custom={0}
							variants={drawVariants}
							initial="normal"
							animate={controls}
						/>
						<motion.path
							d="M6 14h2"
							custom={1}
							variants={drawVariants}
							initial="normal"
							animate={controls}
						/>
					</motion.g>
				</svg>
			</div>
		);
	}
);

CreditCard.displayName = 'CreditCard';

export { CreditCard };
