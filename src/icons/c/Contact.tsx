'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const headVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.3, 1.2, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, ease: 'easeOut' },
	},
};

const shoulderVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.25, ease: 'easeOut' },
	},
};

const Contact = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M16 2v2" />
					<motion.path
						d="M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2"
						variants={shoulderVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M8 2v2" />
					<motion.circle
						cx="12"
						cy="10"
						r="3"
						style={{ originX: '50%', originY: '50%' }}
						variants={headVariants}
						initial="normal"
						animate={controls}
					/>
					<rect x="3" y="3" width="18" height="18" rx="2" />
				</svg>
			</div>
		);
	}
);

Contact.displayName = 'Contact';

export { Contact };
