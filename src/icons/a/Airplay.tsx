'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const screenVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

const triangleVariants = {
	normal: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		scale: [0.6, 1.1, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeOut',
		},
	},
};

const Airplay = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn(className)}
				style={{
					width: size,
					height: size,
					display: 'inline-block',
					...style,
				}}
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
						d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
						variants={screenVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 15l5 6H7z"
						variants={triangleVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Airplay.displayName = 'Airplay';

export { Airplay };
