'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.4 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
};

const audioPulseVariants = {
	normal: { opacity: 1, scaleY: 1, transition: { duration: 0.3 } },
	animate: (delay: number) => ({
		opacity: [1, 0.6, 1],
		scaleY: [1, 1.5, 1],
		transition: {
			duration: 1.2,
			delay,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	}),
};

export const BookAudio = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { cycleMs: 1200 });

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
						d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>

					<motion.path
						d="M12 6v7"
						custom={0}
						variants={audioPulseVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 8v3"
						custom={0.2}
						variants={audioPulseVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 8v3"
						custom={0.4}
						variants={audioPulseVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BookAudio.displayName = 'BookAudio';
