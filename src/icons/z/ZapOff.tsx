'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ZapOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
			'M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317',
			'M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773',
			'M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643',
			'm2 2 20 20',
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

ZapOff.displayName = 'ZapOff';
export { ZapOff };
