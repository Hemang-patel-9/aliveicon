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

const Speaker = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						<rect width="16" height="20" x="4" y="2" rx="2" />
						<path d="M12 6h.01" />
						<circle cx="12" cy="14" r="4" />
						<path d="M12 14h.01" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Speaker.displayName = 'Speaker';

export { Speaker };
