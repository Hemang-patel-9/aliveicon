'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const Castle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						'M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z',
						'M18 11V4H6v7',
						'M15 22v-4a3 3 0 0 0-3-3a3 3 0 0 0-3 3v4',
						'M22 11V9',
						'M2 11V9',
						'M6 4V2',
						'M18 4V2',
						'M10 4V2',
						'M14 4V2',
					].map((d, i) => (
						<motion.path
							key={i}
							d={d}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Castle.displayName = 'Castle';
