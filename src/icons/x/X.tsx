'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const X = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: (i: number) => ({
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					delay: i * 0.15,
					duration: 0.4,
					ease: 'easeInOut',
				},
			}),
		};

		const paths = [
			{ d: 'M18 6 L6 18', key: 'x-line-1' },
			{ d: 'M6 6 L18 18', key: 'x-line-2' },
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

X.displayName = 'X';
export { X };
