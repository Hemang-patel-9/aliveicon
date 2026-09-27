'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ladderVariants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.2 },
	},
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			delay: i * 0.08,
			ease: 'easeInOut',
		},
	}),
};

export const WavesLadder = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const paths = [
			'M19 5a2 2 0 0 0-2 2v11',
			'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
			'M7 13h10',
			'M7 9h10',
			'M9 5a2 2 0 0 0-2 2v11',
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
					{paths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="normal"
							variants={ladderVariants}
							animate={controls}
							custom={i}
						/>
					))}
				</svg>
			</div>
		);
	}
);

WavesLadder.displayName = 'WavesLadder';
