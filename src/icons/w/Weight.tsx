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

const Weight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						'M12 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z',
						'M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z',
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

Weight.displayName = 'Weight';
export { Weight };
