'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tiltVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -6, 5, -2, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const Panda = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.g
						variants={tiltVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M11.25 17.25h1.5L12 18z" />
						<path d="m15 12 2 2" />
						<path d="M17.902 6.599a8 8 0 0 0-.5-.5" />
						<path d="M2 14.5C2 19.47 6.48 22 12 22s10-2.53 10-7.5a10 10 0 0 0-1.3-4.83 4.5 4.5 0 1 0-7.05-5.5 8 8 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5A10 10 0 0 0 2 14.5" />
						<path d="M6.099 6.599a8 8 0 0 1 .5-.5" />
						<path d="m9 12-2 2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Panda.displayName = 'Panda';

export { Panda };
