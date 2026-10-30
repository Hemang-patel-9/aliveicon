'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const handVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, -360],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const kickVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -20, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TimerReset = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10 2h4" />
					<motion.path
						d="M12 14v-4"
						variants={handVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.g variants={kickVariants} initial="normal" animate={controls}>
						<path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
						<path d="M9 17H4v5" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

TimerReset.displayName = 'TimerReset';

export { TimerReset };
