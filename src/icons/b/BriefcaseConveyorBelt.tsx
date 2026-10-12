'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const slideVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const BriefcaseConveyorBelt = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M10 20v2" variants={slideVariants} initial="normal" animate={controls} />
					<motion.path d="M14 20v2" variants={slideVariants} initial="normal" animate={controls} />
					<motion.path d="M18 20v2" variants={slideVariants} initial="normal" animate={controls} />
					<path d="M21 20H3" />
					<motion.path d="M6 20v2" variants={slideVariants} initial="normal" animate={controls} />
					<path d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" />
					<rect x="4" y="6" width="16" height="10" rx="2" />
				</svg>
			</div>
		);
	}
);

BriefcaseConveyorBelt.displayName = 'BriefcaseConveyorBelt';

export { BriefcaseConveyorBelt };
