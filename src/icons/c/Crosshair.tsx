'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tickVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: 90,
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Crosshair = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<circle cx="12" cy="12" r="10" />
					<motion.g
						variants={tickVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<line x1="22" x2="18" y1="12" y2="12" />
						<line x1="6" x2="2" y1="12" y2="12" />
						<line x1="12" x2="12" y1="6" y2="2" />
						<line x1="12" x2="12" y1="22" y2="18" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Crosshair.displayName = 'Crosshair';

export { Crosshair };
