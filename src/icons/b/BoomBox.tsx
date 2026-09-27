'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const boomBoxVariants = {
	normal: {
		x: 0,
		y: 0,
		rotate: 0,
		transition: { duration: 0.3 },
	},
	playing: {
		x: [0, -0.5, 0.5, -0.3, 0.3, 0],
		y: [0, -0.2, 0.2, -0.1, 0.1, 0],
		rotate: [0, -0.3, 0.3, -0.2, 0.2, 0],
		transition: {
			duration: 0.6,
			repeat: 2,
			ease: 'easeInOut',
		},
	},
};

const speakerVariants = {
	normal: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.2 },
	},
	playing: {
		scale: [1, 1.1, 0.95, 1.05, 1],
		opacity: [1, 0.8, 1, 0.9, 1],
		transition: {
			duration: 0.4,
			repeat: 3,
			ease: 'easeInOut',
		},
	},
};

const sliderVariants = {
	normal: {
		scaleY: 1,
		y: 0,
		transition: { duration: 0.2 },
	},
	playing: {
		scaleY: [1, 1.3, 0.8, 1.2, 1],
		y: [0, -0.5, 0.3, -0.2, 0],
		transition: {
			duration: 0.5,
			repeat: 3,
			ease: 'easeInOut',
			staggerChildren: 0.1,
		},
	},
};

const slider1Variants = {
	normal: sliderVariants.normal,
	playing: {
		...sliderVariants.playing,
		transition: {
			...sliderVariants.playing.transition,
			delay: 0,
		},
	},
};

const slider2Variants = {
	normal: sliderVariants.normal,
	playing: {
		...sliderVariants.playing,
		transition: {
			...sliderVariants.playing.transition,
			delay: 0.1,
		},
	},
};

const slider3Variants = {
	normal: sliderVariants.normal,
	playing: {
		...sliderVariants.playing,
		transition: {
			...sliderVariants.playing.transition,
			delay: 0.2,
		},
	},
};

const bodyVariants = {
	normal: {
		filter: 'brightness(1)',
		transition: { duration: 0.3 },
	},
	playing: {
		filter: [
			'brightness(1)',
			'brightness(1.1)',
			'brightness(0.95)',
			'brightness(1.05)',
			'brightness(1)',
		],
		transition: {
			duration: 0.8,
			repeat: 2,
			ease: 'easeInOut',
		},
	},
};

export const BoomBox = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { cycleMs: 1000 });

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<motion.svg
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
					variants={boomBoxVariants}
					initial="normal"
					animate={controls}
				>
					<motion.path
						d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"
						variants={{
							normal: { opacity: 1 },
							playing: { opacity: 1 },
						}}
						initial="normal"
						animate={controls}
					/>

					<motion.path
						d="M8 8v1"
						variants={slider1Variants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: '8px 8.5px' }}
					/>
					<motion.path
						d="M12 8v1"
						variants={slider2Variants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: '12px 8.5px' }}
					/>
					<motion.path
						d="M16 8v1"
						variants={slider3Variants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: '16px 8.5px' }}
					/>

					<motion.rect
						width="20"
						height="12"
						x="2"
						y="9"
						rx="2"
						variants={bodyVariants}
						initial="normal"
						animate={controls}
					/>

					<motion.circle
						cx="8"
						cy="15"
						r="2"
						variants={speakerVariants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: '8px 15px' }}
					/>

					<motion.circle
						cx="16"
						cy="15"
						r="2"
						variants={speakerVariants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: '16px 15px' }}
					/>
				</motion.svg>
			</div>
		);
	}
);

BoomBox.displayName = 'BoomBox';
