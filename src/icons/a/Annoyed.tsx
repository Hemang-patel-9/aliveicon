'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export interface AnnoyedProps extends AnimatedIconProps {
	animationTrigger?: 'manual' | 'hover' | 'click' | 'load';
	delay?: number;
}

const DURATION = 0.7;

const faceVariants: Variants = {
	normal: { scale: 1 },
	animate: (delay: number) => ({
		scale: [1, 1.1, 0.95, 1.1, 1],
		transition: { duration: DURATION, delay, ease: 'easeInOut' },
	}),
};

const mouthVariants: Variants = {
	normal: { x: 0 },
	animate: (delay: number) => ({
		x: [0, -1, 1, -0.5, 0],
		transition: { duration: DURATION, delay, ease: 'easeInOut' },
	}),
};

const leftEyeVariants: Variants = {
	normal: { y: 0 },
	animate: (delay: number) => ({
		y: [0, -3, -1, 0],
		transition: { duration: DURATION, delay, ease: 'easeOut' },
	}),
};

const rightEyeVariants: Variants = {
	normal: { y: 0 },
	animate: (delay: number) => ({
		y: [0, -2, -1, 0],
		transition: { duration: DURATION, delay, ease: 'easeOut' },
	}),
};

const Annoyed = forwardRef<AnimatedIconHandle, AnnoyedProps>(
	(
		{
			className,
			size = 28,
			style,
			animationTrigger = 'hover',
			delay = 0,
			hoverable = true,
			animateOnClick = false,
			autoAnimateOnLoad = false,
			...props
		},
		ref
	) => {
		const playsOnLoad = animationTrigger === 'load' || autoAnimateOnLoad;
		const startDelay = playsOnLoad ? delay / 1000 : 0;
		const { controls, iconProps } = useAnimatedIcon(ref, {
			...props,
			hoverable: animationTrigger === 'hover' && hoverable,
			animateOnClick: animationTrigger === 'click' || animateOnClick,
			autoAnimateOnLoad: playsOnLoad,
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
						cx="12"
						cy="12"
						r="10"
						custom={startDelay}
						variants={faceVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 15h8"
						custom={startDelay}
						variants={mouthVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 9h2"
						custom={startDelay}
						variants={leftEyeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 9h2"
						custom={startDelay}
						variants={rightEyeVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Annoyed.displayName = 'Annoyed';

export { Annoyed };
