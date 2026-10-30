'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const flipVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 0.15, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const PlayingCard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={flipVariants} initial="normal" animate={controls}>
						<path d="M12.832 8.445a1 1 0 00-1.589-.098l-2.075 3.098a1 1 0 000 1.11l2 3a1 1 0 001.664 0l2-3a1 1 0 000-1.11z" />
						<rect x="5" y="2" width="14" height="20" rx="2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

PlayingCard.displayName = 'PlayingCard';

export { PlayingCard };
