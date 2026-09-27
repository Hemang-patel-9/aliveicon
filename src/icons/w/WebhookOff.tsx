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

const WebhookOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						'M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15',
						'M9 3.4a4 4 0 0 1 6.52.66',
						'm6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05',
						'M20.3 20.3a4 4 0 0 1-2.3.7',
						'M18.6 13a4 4 0 0 1 3.357 3.414',
						'm12 6 .6 1',
						'm2 2 20 20',
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

WebhookOff.displayName = 'WebhookOff';
export { WebhookOff };
