'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export interface AntennaProps extends AnimatedIconProps {
	animationTrigger?: 'manual' | 'hover' | 'click' | 'load';
	delay?: number;
}

const DURATION = 1.2;

const rodVariants: Variants = {
	normal: { rotate: 0, originX: '50%', originY: '100%' },
	animate: (delay: number) => ({
		rotate: [0, 5, -5, 5, 0],
		transition: { duration: DURATION, delay, ease: 'easeInOut', repeat: Infinity },
	}),
};

const horizontalLineVariants: Variants = {
	normal: { scaleX: 1, originX: 0 },
	animate: (delay: number) => ({
		scaleX: [1, 1.1, 0.9, 1.1, 1],
		transition: { duration: DURATION, delay, ease: 'easeInOut', repeat: Infinity },
	}),
};

const verticalLineVariants: Variants = {
	normal: { scaleY: 1, originY: '100%' },
	animate: (delay: number) => ({
		scaleY: [1, 1.2, 0.8, 1.2, 1],
		transition: { duration: DURATION, delay, ease: 'easeInOut', repeat: Infinity },
	}),
};

const Antenna = forwardRef<AnimatedIconHandle, AntennaProps>(
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
		const { controls, iconProps } = useAnimatedIcon(
			ref,
			{
				...props,
				hoverable: animationTrigger === 'hover' && hoverable,
				animateOnClick: animationTrigger === 'click' || animateOnClick,
				autoAnimateOnLoad: playsOnLoad,
			},
			{ cycleMs: DURATION * 1000 + startDelay * 1000 }
		);

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
					<motion.path
						d="M2 12 7 2"
						custom={startDelay}
						variants={rodVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="m7 12 5-10"
						custom={startDelay}
						variants={rodVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="m12 12 5-10"
						custom={startDelay}
						variants={rodVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="m17 12 5-10"
						custom={startDelay}
						variants={rodVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="M4.5 7h15"
						custom={startDelay}
						variants={horizontalLineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 16v6"
						custom={startDelay}
						variants={verticalLineVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Antenna.displayName = 'Antenna';

export { Antenna };
