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
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const CircleDashed2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const paths = [
			'M10.1 2.182a10 10 0 0 1 3.8 0',
			'M13.9 21.818a10 10 0 0 1-3.8 0',
			'M17.609 3.721a10 10 0 0 1 2.69 2.7',
			'M2.182 13.9a10 10 0 0 1 0-3.8',
			'M20.279 17.609a10 10 0 0 1-2.7 2.69',
			'M21.818 10.1a10 10 0 0 1 0 3.8',
			'M3.721 6.391a10 10 0 0 1 2.7-2.69',
			'M6.391 20.279a10 10 0 0 1-2.69-2.7',
		];

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
					{paths.map((d, index) => (
						<motion.path
							key={index}
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

CircleDashed2.displayName = 'CircleDashed2';
