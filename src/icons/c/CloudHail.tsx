'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dropVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [-3, 0],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const CloudHail = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
					<motion.g custom={0} variants={dropVariants} initial="normal" animate={controls}>
						<path d="M8 14v2" />
						<path d="M8 20h.01" />
					</motion.g>
					<motion.g custom={1} variants={dropVariants} initial="normal" animate={controls}>
						<path d="M12 16v2" />
						<path d="M12 22h.01" />
					</motion.g>
					<motion.g custom={2} variants={dropVariants} initial="normal" animate={controls}>
						<path d="M16 14v2" />
						<path d="M16 20h.01" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CloudHail.displayName = 'CloudHail';

export { CloudHail };
