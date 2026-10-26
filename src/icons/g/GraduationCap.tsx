'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const tossVariants: Variants = {
	normal: { y: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -3, 0],
		rotate: [0, -8, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const tasselVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 15, -10, 0],
		transition: { duration: 0.6, delay: 0.1, ease: 'easeInOut' },
	},
};

const GraduationCap = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={tossVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
						<motion.path
							d="M22 10v6"
							variants={tasselVariants}
							initial="normal"
							animate={controls}
							style={{ originX: '50%', originY: '0%' }}
						/>
					</motion.g>
					<path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
				</svg>
			</div>
		);
	}
);

GraduationCap.displayName = 'GraduationCap';

export { GraduationCap };
