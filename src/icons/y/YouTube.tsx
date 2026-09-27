'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const YouTube = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: (i: number) => ({
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					delay: i * 0.2,
					duration: 0.5,
					ease: 'easeInOut',
				},
			}),
		};

		const paths: { d: string; key: string }[] = [
			{
				d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17',
				key: 'youtube-body',
			},
			{
				d: 'M10 15l5-3-5-3z',
				key: 'youtube-play',
			},
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
					{paths.map((p, i) => (
						<motion.path
							key={p.key}
							d={p.d}
							variants={pathVariants}
							initial="normal"
							animate={controls}
							custom={i}
						/>
					))}
				</svg>
			</div>
		);
	}
);

YouTube.displayName = 'YouTube';
export { YouTube };
