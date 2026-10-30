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

const riseVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		scaleY: [0.5, 1.08, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Podium = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 6V2h-1"
						variants={drawVariants}
						custom={[0.35, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<path d="M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1" />
					<motion.path
						d="M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10"
						variants={riseVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Podium.displayName = 'Podium';

export { Podium };
