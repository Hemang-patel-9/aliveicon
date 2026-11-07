'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const blinkVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		scaleY: [1, 1, 0.15, 1],
		transition: { duration: 0.6, times: [0, 0.5, 0.7, 1], ease: 'easeInOut' },
	},
};

const Twitch = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

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
					<path d="M21 2H3v16h5v4l4-4h5l4-4V2z" />
					<motion.path
						d="M11 11V7"
						variants={blinkVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 11V7"
						variants={blinkVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Twitch.displayName = 'Twitch';

export { Twitch };
