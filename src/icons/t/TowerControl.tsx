'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const blinkVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [1, 0, 1, 0, 1],
		transition: { duration: 0.8, ease: 'linear' },
	},
};

const TowerControl = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" />
					<path d="M8 13v9" />
					<path d="M16 22v-9" />
					<motion.path
						d="m9 6 1 7"
						variants={drawVariants}
						custom={[0.1, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m15 6-1 7"
						variants={drawVariants}
						custom={[0.2, 1, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<path d="M12 6V2" />
					<motion.path d="M13 2h-2" variants={blinkVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

TowerControl.displayName = 'TowerControl';

export { TowerControl };
