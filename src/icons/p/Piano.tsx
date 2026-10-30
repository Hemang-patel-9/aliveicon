'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const keyVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		y: [0, 1, 0],
		transition: { duration: 0.3, delay, ease: 'easeInOut' },
	}),
};

const Piano = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 13v4"
						variants={keyVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 13v4"
						variants={keyVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 13v4"
						variants={keyVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<path d="M2 13h20" />
					<path d="M22 11.5A3.5 3.5 0 0018.5 8a3.52 3.52 0 01-3.173-2A7 7 0 002 9v10a2 2 0 002 2h16a2 2 0 002-2z" />
					<motion.path
						d="M6 13v4"
						variants={keyVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Piano.displayName = 'Piano';

export { Piano };
