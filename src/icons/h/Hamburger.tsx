'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const liftVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Hamburger = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" />
					<motion.path
						d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2"
						variants={liftVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" />
					<path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
				</svg>
			</div>
		);
	}
);

Hamburger.displayName = 'Hamburger';

export { Hamburger };
