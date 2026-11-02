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

const MapPinX = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						<path d="M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077" />
						<circle cx="12" cy="10" r="3" />
						<path d="m21.5 15.5-5 5" />
						<path d="m21.5 20.5-5-5" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

MapPinX.displayName = 'MapPinX';

export { MapPinX };
