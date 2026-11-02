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

const MapPinCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						<path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728" />
						<circle cx="12" cy="10" r="3" />
						<path d="m16 18 2 2 4-4" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

MapPinCheck.displayName = 'MapPinCheck';

export { MapPinCheck };
