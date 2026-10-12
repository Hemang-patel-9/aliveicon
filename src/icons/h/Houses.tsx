'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const Houses = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m12.681 4.24.834-.715a1.45 1.45 0 011.88 0l5.09 4.364A1.45 1.45 0 0121 9v6.546a1.45 1.45 0 01-1 1.381"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M15.485 11.889A1.45 1.45 0 0116 13v6.546A1.454 1.454 0 0114.546 21H4.364a1.454 1.454 0 01-1.454-1.454V13a1.45 1.45 0 01.515-1.111l5.09-4.364a1.45 1.45 0 011.88 0z"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M7.41 20.546v-4a1 1 0 011-1h2a1 1 0 011 1v4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
				</svg>
			</div>
		);
	}
);

Houses.displayName = 'Houses';

export { Houses };
