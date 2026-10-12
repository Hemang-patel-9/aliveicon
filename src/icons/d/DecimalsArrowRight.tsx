'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const DecimalsArrowRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M10 18h10" variants={rightVariants} initial="normal" animate={controls} />
					<motion.path
						d="m17 21 3-3-3-3"
						variants={rightVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 11h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<rect x="15" y="3" width="5" height="8" rx="2.5" />
					<rect x="6" y="3" width="5" height="8" rx="2.5" />
				</svg>
			</div>
		);
	}
);

DecimalsArrowRight.displayName = 'DecimalsArrowRight';

export { DecimalsArrowRight };
