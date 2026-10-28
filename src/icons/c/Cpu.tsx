'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pinVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { duration: 0.3, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const coreVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.7, 1.1, 1],
		transition: { duration: 0.5, delay: 0.2, ease: 'easeInOut' },
	},
};

const Cpu = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g custom={0} variants={pinVariants} initial="normal" animate={controls}>
						<path d="M12 2v2" />
						<path d="M17 2v2" />
						<path d="M7 2v2" />
					</motion.g>
					<motion.g custom={1} variants={pinVariants} initial="normal" animate={controls}>
						<path d="M20 12h2" />
						<path d="M20 17h2" />
						<path d="M20 7h2" />
					</motion.g>
					<motion.g custom={2} variants={pinVariants} initial="normal" animate={controls}>
						<path d="M12 20v2" />
						<path d="M17 20v2" />
						<path d="M7 20v2" />
					</motion.g>
					<motion.g custom={3} variants={pinVariants} initial="normal" animate={controls}>
						<path d="M2 12h2" />
						<path d="M2 17h2" />
						<path d="M2 7h2" />
					</motion.g>
					<rect x="4" y="4" width="16" height="16" rx="2" />
					<motion.rect
						x="8"
						y="8"
						width="8"
						height="8"
						rx="1"
						style={{ originX: '50%', originY: '50%' }}
						variants={coreVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Cpu.displayName = 'Cpu';

export { Cpu };
