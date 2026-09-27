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
		delay: i * 0.1,
		ease: 'easeInOut',
	},
});

const Webhook = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { animate: animateTarget });

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
					{[
						'M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2',
						'm6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06',
						'm12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8',
					].map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="normal"
							animate={controls}
							custom={i}
							variants={{
								normal: { pathLength: 1, opacity: 1 },
							}}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Webhook.displayName = 'Webhook';
export { Webhook };
