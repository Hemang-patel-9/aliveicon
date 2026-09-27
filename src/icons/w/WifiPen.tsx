'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon, type AnimationDefinition } from '../../lib/use-animated-icon';

const animateTarget: AnimationDefinition = (i) => ({
	pathLength: [0, 1],
	opacity: [0, 1],
	transition: {
		duration: 0.4,
		delay: i * 0.1,
		ease: 'easeInOut',
	},
});

const WifiPen = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = [
			'M8.5 16.429a5 5 0 0 1 3-1.406',
			'M5 12.859a10 10 0 0 1 10.5-2.222',
			'M2 8.82a15 15 0 0 1 20 0',
			'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{paths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="visible"
							animate={controls}
							custom={i}
							variants={{
								visible: { pathLength: 1, opacity: 1 },
							}}
						/>
					))}
				</svg>
			</div>
		);
	}
);

WifiPen.displayName = 'WifiPen';
export { WifiPen };
