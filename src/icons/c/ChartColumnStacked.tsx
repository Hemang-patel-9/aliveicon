'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const barVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scaleY: [0, 1],
		transition: { duration: 0.4, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const dividerVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [0, 1],
		transition: { duration: 0.25, delay: 0.5 },
	},
};

const ChartColumnStacked = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M3 3v16a2 2 0 0 0 2 2h16" />
					<motion.rect
						x="15"
						y="5"
						width="4"
						height="12"
						rx="1"
						style={{ originX: '50%', originY: '100%' }}
						custom={0}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="7"
						y="8"
						width="4"
						height="9"
						rx="1"
						style={{ originX: '50%', originY: '100%' }}
						custom={1}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11 13H7"
						variants={dividerVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 9h-4"
						variants={dividerVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartColumnStacked.displayName = 'ChartColumnStacked';

export { ChartColumnStacked };
