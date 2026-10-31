'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const FileSpreadsheet = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M8 13h2"
						variants={popVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 13h2"
						variants={popVariants}
						custom={0.08}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 17h2"
						variants={popVariants}
						custom={0.16}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 17h2"
						variants={popVariants}
						custom={0.24}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FileSpreadsheet.displayName = 'FileSpreadsheet';

export { FileSpreadsheet };
