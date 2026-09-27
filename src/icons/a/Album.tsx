'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const squareVariants = {
	normal: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.4 },
	},
	animate: {
		scale: 1.1,
		opacity: 0.9,
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const pathVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'linear',
			opacity: { duration: 0.1 },
		},
	},
};

const Album = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('rounded-md', className)}
				style={{
					width: size,
					height: size,
					display: 'inline-block',
					...style,
				}}
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
						width="18"
						height="18"
						x="3"
						y="3"
						rx="2"
						ry="2"
						variants={squareVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.polyline
						points="11 3 11 11 14 8 17 11 17 3"
						variants={pathVariants}
						animate={controls}
						initial="normal"
						style={{ strokeDasharray: 1 }}
					/>
				</svg>
			</div>
		);
	}
);

Album.displayName = 'Album';

export { Album };
