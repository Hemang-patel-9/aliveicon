'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nudgeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const blinkVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [1, 0, 1, 0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const FileTerminal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
					<path d="M14 2v5a1 1 0 0 0 1 1h5" />
					<motion.path
						d="m8 16 2-2-2-2"
						variants={nudgeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 18h4" variants={blinkVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

FileTerminal.displayName = 'FileTerminal';

export { FileTerminal };
