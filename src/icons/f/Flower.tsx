'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bloomVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.85, 1.08, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const Flower = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={bloomVariants} initial="normal" animate={controls}>
						<circle cx="12" cy="12" r="3" />
						<path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
					</motion.g>
					<motion.path
						d="M12 7.5V9"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7.5 12H9"
						variants={popVariants}
						custom={0.34}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16.5 12H15"
						variants={popVariants}
						custom={0.18}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 16.5V15"
						variants={popVariants}
						custom={0.26}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m8 8 1.88 1.88"
						variants={popVariants}
						custom={0.38}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14.12 9.88 16 8"
						variants={popVariants}
						custom={0.14}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m8 16 1.88-1.88"
						variants={popVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14.12 14.12 16 16"
						variants={popVariants}
						custom={0.22}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Flower.displayName = 'Flower';

export { Flower };
