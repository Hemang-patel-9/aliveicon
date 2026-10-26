'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const floatVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0.5, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const blinkVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		scaleY: [1, 0.1, 1],
		transition: { duration: 0.3, delay: 0.3, ease: 'easeInOut' },
	},
};

const Ghost = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={floatVariants} initial="normal" animate={controls}>
						<motion.path
							d="M15 10v1"
							variants={blinkVariants}
							initial="normal"
							animate={controls}
							style={{ originX: '50%', originY: '50%' }}
						/>
						<path d="M7.528 20.472a1.6 1.6 0 012.277 0l1.057 1.056a1.6 1.6 0 002.276 0l1.057-1.056a1.6 1.6 0 012.277 0l1.114 1.114a1.4 1.4 0 002.414-1V10a8 8 0 00-16 0v10.586a1.4 1.4 0 002.414 1z" />
						<motion.path
							d="M9 10v1"
							variants={blinkVariants}
							initial="normal"
							animate={controls}
							style={{ originX: '50%', originY: '50%' }}
						/>
					</motion.g>
				</svg>
			</div>
		);
	}
);

Ghost.displayName = 'Ghost';

export { Ghost };
