'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const slashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.3, ease: 'easeInOut' },
	},
};

const WebcamOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 22v-4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M12.754 7.096a3 3 0 0 1 2.15 2.15"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M12.863 12.873a3 3 0 0 1-3.736-3.735"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M16.566 16.57A8 8 0 0 1 5.43 5.433"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="m2 2 20 20"
						variants={slashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 22h10"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
					<motion.path
						d="M8.478 2.817a8 8 0 0 1 10.705 10.705"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={5}
					/>
				</svg>
			</div>
		);
	}
);

WebcamOff.displayName = 'WebcamOff';

export { WebcamOff };
