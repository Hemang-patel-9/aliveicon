'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turn180Variants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 180],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Hourglass = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={turn180Variants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M5 22h14" />
						<path d="M5 2h14" />
						<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
						<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Hourglass.displayName = 'Hourglass';

export { Hourglass };
