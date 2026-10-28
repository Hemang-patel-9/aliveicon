'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1 },
	animate: {
		pathLength: [0, 1],
		transition: { duration: 1, ease: 'easeInOut' },
	},
};

const circleVariants: Variants = {
	normal: { scale: 1, opacity: 1 },
	animate: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, delay: 0.4 },
	},
};

const dotVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 0, 1],
		transition: { duration: 1.2 + i * 0.1, times: [0, (1 + i * 0.1) / (1.2 + i * 0.1), 1] },
	}),
};

const University = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M14 21v-3a2 2 0 0 0-4 0v3"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 2v1" variants={pathVariants} initial="normal" animate={controls} />
					<motion.circle
						cx="12"
						cy="10"
						r="2"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 12h.01"
						custom={0}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 16h.01"
						custom={1}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 12h.01"
						custom={2}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 16h.01"
						custom={3}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

University.displayName = 'University';

export { University };
