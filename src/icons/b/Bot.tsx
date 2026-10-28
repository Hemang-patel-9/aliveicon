'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5 },
	},
};

const blinkVariants: Variants = {
	normal: { scaleY: 1 },
	animate: {
		scaleY: [1, 0.1, 1],
		transition: { duration: 0.5, delay: 0.5, ease: 'easeInOut' },
	},
};

const Bot = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M12 8V4H8" />
					<rect width="16" height="12" x="4" y="8" rx="2" />
					<path d="M2 14h2" />
					<path d="M20 14h2" />
					<motion.path d="M9 13v2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M15 13v2"
						style={{ originX: '50%', originY: '50%' }}
						variants={blinkVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Bot.displayName = 'Bot';

export { Bot };
