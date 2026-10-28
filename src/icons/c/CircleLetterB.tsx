'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const glyphVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const CircleLetterB = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M9 12h4.846a2.24 2.24 0 011.523.586 2 2 0 01.001 2.828 2.24 2.24 0 01-1.524.586H9.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5H13a2 2 0 010 4"
						variants={glyphVariants}
						initial="normal"
						animate={controls}
					/>
					<circle cx="12" cy="12" r="10" />
				</svg>
			</div>
		);
	}
);

CircleLetterB.displayName = 'CircleLetterB';

export { CircleLetterB };
