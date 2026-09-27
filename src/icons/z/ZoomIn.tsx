'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ZoomIn = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: (i: number) => ({
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					delay: i * 0.15,
					duration: 0.5,
					ease: 'easeInOut',
				},
			}),
		};

		const paths: { d: string; key: string }[] = [
			{ d: 'M11 8v6', key: 'v-line' },
			{ d: 'M8 11h6', key: 'h-line' },
			{ d: 'M21 21l-4.35-4.35', key: 'zoom-line' },
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
					<motion.circle
						cx="11"
						cy="11"
						r="8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					{paths.map((p, i) => (
						<motion.path
							key={p.key}
							d={p.d}
							variants={pathVariants}
							initial="normal"
							animate={controls}
							custom={i + 1}
						/>
					))}
				</svg>
			</div>
		);
	}
);

ZoomIn.displayName = 'ZoomIn';
export { ZoomIn };
