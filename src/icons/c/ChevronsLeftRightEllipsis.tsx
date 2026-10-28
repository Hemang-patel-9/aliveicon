'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { x: 0 },
	animate: (distance: number) => ({
		x: [0, distance, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	}),
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1 },
	animate: {
		scale: [1, 1.25, 1],
		opacity: [1, 0.6, 1],
		transition: { duration: 0.8, repeat: 1 },
	},
};

const ChevronsLeftRightEllipsis = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M12 12h.01" variants={dotVariants} initial="normal" animate={controls} />
					<motion.path d="M16 12h.01" variants={dotVariants} initial="normal" animate={controls} />
					<motion.path d="M8 12h.01" variants={dotVariants} initial="normal" animate={controls} />
					<motion.path
						d="M17 7l5 5-5 5"
						custom={-3}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 7l-5 5 5 5"
						custom={3}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChevronsLeftRightEllipsis.displayName = 'ChevronsLeftRightEllipsis';

export { ChevronsLeftRightEllipsis };
