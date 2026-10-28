'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const syncVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: 180,
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const CloudSync = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607" />
					<motion.g
						variants={syncVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5" />
						<path d="M17 22v-4h-4" />
						<path d="M7 10v4h4" />
						<path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CloudSync.displayName = 'CloudSync';

export { CloudSync };
