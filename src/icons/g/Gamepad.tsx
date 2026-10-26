'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tiltVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 6, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.6, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const Gamepad = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={tiltVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<line x1="6" x2="10" y1="12" y2="12" />
						<line x1="8" x2="8" y1="10" y2="14" />
						<motion.line
							x1="15"
							x2="15.01"
							y1="13"
							y2="13"
							variants={popVariants}
							custom={0.2}
							initial="normal"
							animate={controls}
						/>
						<motion.line
							x1="18"
							x2="18.01"
							y1="11"
							y2="11"
							variants={popVariants}
							custom={0.3}
							initial="normal"
							animate={controls}
						/>
						<rect width="20" height="12" x="2" y="6" rx="2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Gamepad.displayName = 'Gamepad';

export { Gamepad };
