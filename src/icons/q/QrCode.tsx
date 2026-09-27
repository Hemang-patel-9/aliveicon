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
		transition: { duration: 0.3 },
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

export const QrCode = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						width="5"
						height="5"
						x="3"
						y="3"
						rx="1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="5"
						height="5"
						x="16"
						y="3"
						rx="1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="5"
						height="5"
						x="3"
						y="16"
						rx="1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M21 16h-3a2 2 0 0 0-2 2v3"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="M21 21v.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M12 7v3a2 2 0 0 1-2 2H7"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="M3 12h.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 3h.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 16v.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M16 12h1" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M21 12v.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 21v-1" variants={pathVariants} animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

QrCode.displayName = 'QrCode';
