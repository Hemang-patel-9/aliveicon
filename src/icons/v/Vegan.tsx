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
		duration: 0.6,
		delay: i * 0.08,
		ease: 'easeInOut',
	},
});

const Vegan = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = [
			'M16 8q6 0 6-6-6 0-6 6',
			'M17.41 3.59a10 10 0 1 0 3 3',
			'M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14',
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
							variants={{ visible: { pathLength: 1, opacity: 1 } }}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Vegan.displayName = 'Vegan';
export { Vegan };
