'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const blockVariants: Variants = {
	normal: {
		x: 0,
		y: 0,
		transition: { type: 'spring', stiffness: 200, damping: 10 },
	},
	animate: {
		x: 2,
		y: -2,
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const Blocks = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						width="7"
						height="7"
						x="14"
						y="3"
						rx="1"
						variants={blockVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
				</svg>
			</div>
		);
	}
);

Blocks.displayName = 'Blocks';

export { Blocks };
