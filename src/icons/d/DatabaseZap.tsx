'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const DatabaseZap = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<ellipse cx="12" cy="5" rx="9" ry="3" />
					<path d="M3 5V19A9 3 0 0 0 15 21.84" />
					<path d="M21 5V8" />
					<motion.path
						d="M21 12L18 17H22L19 22"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<path d="M3 12A9 3 0 0 0 14.59 14.87" />
				</svg>
			</div>
		);
	}
);

DatabaseZap.displayName = 'DatabaseZap';

export { DatabaseZap };
