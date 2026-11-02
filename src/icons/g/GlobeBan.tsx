'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const squashVariants: Variants = {
	normal: { scaleY: 1, scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleY: [1, 0.86, 1.06, 1],
		scaleX: [1, 1.08, 0.97, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const GlobeBan = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={squashVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M12 22a14.48 14.48 0 01-4.008-10C7.993 9.136 9 5.258 11 2.05A10 10 0 0012 22" />
						<path d="m15.172 3.172 5.656 5.656" />
						<path d="M15.86 14a14.5 14.5 0 01-3.859 8 10 10 0 009.949-9" />
						<path d="M2 12h10.5" />
						<circle cx="18" cy="6" r="4" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

GlobeBan.displayName = 'GlobeBan';

export { GlobeBan };
