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
		duration: 0.5,
		delay: i * 0.08,
		ease: 'easeInOut',
	},
});

const Volleyball = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = [
			'M11.1 7.1a16.55 16.55 0 0 1 10.9 4',
			'M12 12a12.6 12.6 0 0 1-8.7 5',
			'M16.8 13.6a16.55 16.55 0 0 1-9 7.5',
			'M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10',
			'M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5',
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
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						initial="visible"
						animate={controls}
						custom={paths.length}
						variants={{
							visible: { pathLength: 1, opacity: 1 },
						}}
					/>
				</svg>
			</div>
		);
	}
);

Volleyball.displayName = 'Volleyball';
export { Volleyball };
