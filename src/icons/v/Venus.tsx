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
		delay: i * 0.08,
		ease: 'easeInOut',
	},
});

const Venus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const shapes = [
			{ type: 'path', d: 'M12 15v7' },
			{ type: 'path', d: 'M9 19h6' },
			{ type: 'circle', props: { cx: 12, cy: 9, r: 6 } },
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
					{shapes.map((shape, i) =>
						shape.type === 'path' ? (
							<motion.path
								key={i}
								d={shape.d}
								initial="visible"
								animate={controls}
								custom={i}
								variants={{ visible: { pathLength: 1, opacity: 1 } }}
							/>
						) : (
							<motion.circle
								key={i}
								{...shape.props}
								initial="visible"
								animate={controls}
								custom={i}
								variants={{ visible: { pathLength: 1, opacity: 1 } }}
							/>
						)
					)}
				</svg>
			</div>
		);
	}
);

Venus.displayName = 'Venus';
export { Venus };
