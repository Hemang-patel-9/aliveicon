'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 90, 90, 0],
		transition: { duration: 0.8, times: [0, 0.4, 0.6, 1], ease: 'easeInOut' },
	},
};

const Loader = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={turnVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M12 2v4" />
						<path d="m16.2 7.8 2.9-2.9" />
						<path d="M18 12h4" />
						<path d="m16.2 16.2 2.9 2.9" />
						<path d="M12 18v4" />
						<path d="m4.9 19.1 2.9-2.9" />
						<path d="M2 12h4" />
						<path d="m4.9 4.9 2.9 2.9" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Loader.displayName = 'Loader';

export { Loader };
