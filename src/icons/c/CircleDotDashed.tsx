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
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const CircleDotDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					{[
						'M10.1 2.18a9.93 9.93 0 0 1 3.8 0',
						'M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7',
						'M21.82 10.1a9.93 9.93 0 0 1 0 3.8',
						'M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69',
						'M13.9 21.82a9.94 9.94 0 0 1-3.8 0',
						'M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7',
						'M2.18 13.9a9.93 9.93 0 0 1 0-3.8',
						'M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69',
					].map((d, i) => (
						<motion.path
							key={i}
							d={d}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					))}
					<motion.circle
						cx="12"
						cy="12"
						r="1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleDotDashed.displayName = 'CircleDotDashed';
