'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shakeVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 8, -4, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const HandFist = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={shakeVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0" />
						<path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5" />
						<path d="M9 5A2 2 0 1 0 5 5V10" />
						<path d="M9 7V4A2 2 0 1 1 13 4V7.268" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

HandFist.displayName = 'HandFist';

export { HandFist };
