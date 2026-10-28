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

const DatabasePlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.path
						d="M19 16v6"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<path d="M21 12.536V5" />
					<motion.path
						d="M22 19h-6"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<path d="M3 12A9 3 0 0 0 15.1824 14.8061" />
					<path d="M3 5V19A9 3 0 0 0 13.318 21.968" />
					<ellipse cx="12" cy="5" rx="9" ry="3" />
				</svg>
			</div>
		);
	}
);

DatabasePlus.displayName = 'DatabasePlus';

export { DatabasePlus };
