'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const glideVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		x: [0, 1.5 + i * 0.5, 0],
		y: [0, -(1.5 + i * 0.5), 0],
		transition: { duration: 0.6, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const Kayak = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z"
						variants={glideVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61"
						variants={glideVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="m6.707 6.707 10.586 10.586"
						variants={glideVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z"
						variants={glideVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
				</svg>
			</div>
		);
	}
);

Kayak.displayName = 'Kayak';

export { Kayak };
