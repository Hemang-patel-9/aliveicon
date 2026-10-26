'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const beamVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: 0.2, ease: 'easeInOut' },
	},
};

const headVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.3, 1],
		transition: { duration: 0.4, delay: i * 0.15, ease: 'easeInOut' },
	}),
};

const EighthNotes = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19"
						variants={beamVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="18"
						cy="16"
						r="3"
						variants={headVariants}
						custom={0}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					/>
					<motion.circle
						cx="6"
						cy="19"
						r="3"
						variants={headVariants}
						custom={1}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					/>
				</svg>
			</div>
		);
	}
);

EighthNotes.displayName = 'EighthNotes';

export { EighthNotes };
