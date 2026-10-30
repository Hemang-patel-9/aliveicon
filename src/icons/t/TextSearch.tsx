'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const scanVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 0.5, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const TextSearch = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M21 5H3" />
					<path d="M10 12H3" />
					<path d="M10 19H3" />
					<motion.g variants={scanVariants} initial="normal" animate={controls}>
						<circle cx="17" cy="15" r="3" />
						<path d="m21 19-1.9-1.9" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

TextSearch.displayName = 'TextSearch';

export { TextSearch };
