'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cherryVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.5, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, ease: 'easeOut' },
	},
};

const linerVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: 0.2 + i * 0.1, ease: 'easeOut' },
	}),
};

const Cupcake = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 22v-9"
						custom={1}
						variants={linerVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M14 4h1a3 3 0 013 3l-.004.125A4 4 0 0121 11v2" />
					<motion.path
						d="m15.5 22 1.5-9"
						custom={2}
						variants={linerVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M21 13a1 1 0 01.919 1.394l-2.74 6.394A2 2 0 0117.34 22H6.659a2 2 0 01-1.838-1.212l-2.74-6.394A1 1 0 013 13z" />
					<path d="M3 13v-2a4 4 0 013.003-3.875L6 7a3 3 0 013-3h1" />
					<motion.path
						d="M8.5 22 7 13"
						custom={0}
						variants={linerVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="4"
						r="2"
						style={{ originX: '50%', originY: '50%' }}
						variants={cherryVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Cupcake.displayName = 'Cupcake';

export { Cupcake };
