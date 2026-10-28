'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const hookVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.4, 1.6, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.45, ease: 'easeOut' },
	},
};

const CircleQuestionMark = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<circle cx="12" cy="12" r="10" />
					<motion.path
						d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
						variants={hookVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 17h.01" variants={dotVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

CircleQuestionMark.displayName = 'CircleQuestionMark';

export { CircleQuestionMark };
