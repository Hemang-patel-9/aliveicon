'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arcVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.15, ease: 'easeInOut' },
	}),
};

const personVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0.6, 1.1, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay: 0.3 + i * 0.12, ease: 'easeOut' },
	}),
};

const UsersRoundCollaboration = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M20.453 8.911a9 9 0 00-6.696-5.738"
						variants={arcVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.889 15.9a9 9 0 005.247 4.632"
						variants={arcVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 12a4 4 0 017.963-.543"
						variants={personVariants}
						custom={0}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					/>
					<motion.circle
						cx="7"
						cy="5"
						r="3"
						variants={personVariants}
						custom={0}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					/>
					<motion.path
						d="M21 22a4 4 0 00-8 0"
						variants={personVariants}
						custom={1}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					/>
					<motion.circle
						cx="17"
						cy="15"
						r="3"
						variants={personVariants}
						custom={1}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					/>
				</svg>
			</div>
		);
	}
);

UsersRoundCollaboration.displayName = 'UsersRoundCollaboration';

export { UsersRoundCollaboration };
