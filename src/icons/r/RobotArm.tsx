'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const sweepTurnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -4, 3, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const RobotArm = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={sweepTurnVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '36%', originY: '100%' }}
					>
						<path d="M12 21 7.5 8.322" />
						<path d="m14 7 1.75-3.767a.5.5 0 0 1 .662-.172L20 5.005" />
						<path d="m20 8.998-3.588 1.944a.5.5 0 0 1-.662-.172L14 7H8" />
					</motion.g>
					<path d="M3.486 21h10" />
					<path d="M5 21V8.732" />
					<motion.circle
						cx="6"
						cy="7"
						r="2"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
				</svg>
			</div>
		);
	}
);

RobotArm.displayName = 'RobotArm';

export { RobotArm };
