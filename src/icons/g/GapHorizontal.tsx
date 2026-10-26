'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const spreadVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ({ x = 0, y = 0, delay = 0 }: { x?: number; y?: number; delay?: number }) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.5, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.4, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const GapHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M12 2v2"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 8v2"
						variants={popVariants}
						custom={0.18}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 14v2"
						variants={popVariants}
						custom={0.26}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 20v2"
						variants={popVariants}
						custom={0.34}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 3h-3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"
						variants={spreadVariants}
						custom={{ x: 2 }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3"
						variants={spreadVariants}
						custom={{ x: -2 }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GapHorizontal.displayName = 'GapHorizontal';

export { GapHorizontal };
