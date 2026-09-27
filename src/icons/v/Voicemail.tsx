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
		delay: i * 0.1,
		ease: 'easeInOut',
	},
});

const Voicemail = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

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
					<motion.circle
						cx="6"
						cy="12"
						r="4"
						initial="visible"
						animate={controls}
						custom={0}
						variants={{
							visible: { pathLength: 1, opacity: 1 },
						}}
					/>
					<motion.circle
						cx="18"
						cy="12"
						r="4"
						initial="visible"
						animate={controls}
						custom={1}
						variants={{
							visible: { pathLength: 1, opacity: 1 },
						}}
					/>
					<motion.line
						x1="6"
						y1="16"
						x2="18"
						y2="16"
						initial="visible"
						animate={controls}
						custom={2}
						variants={{
							visible: { pathLength: 1, opacity: 1 },
						}}
					/>
				</svg>
			</div>
		);
	}
);

Voicemail.displayName = 'Voicemail';
export { Voicemail };
