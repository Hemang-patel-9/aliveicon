'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Bath = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path d="M10 4 L8 6" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M17 19v2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M2 12h20" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M7 19v2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M9 5 L7.621 3.621 A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Bath.displayName = 'Bath';

export { Bath };
