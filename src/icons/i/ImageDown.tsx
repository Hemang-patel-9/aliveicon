'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const downVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		y: [-2, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

const ImageDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
					<motion.path
						d="m14 19 3 3v-5.5"
						variants={downVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="m17 22 3-3" variants={downVariants} initial="normal" animate={controls} />
					<circle cx="9" cy="9" r="2" />
				</svg>
			</div>
		);
	}
);

ImageDown.displayName = 'ImageDown';

export { ImageDown };
