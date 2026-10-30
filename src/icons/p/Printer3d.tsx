'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const nozzleVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, -1, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const printVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		scaleY: [0.3, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Printer3d = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={nozzleVariants} initial="normal" animate={controls}>
						<path d="M10 11v1" />
						<path d="M8.635 10.093A2 2 0 018 8.631V7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-.293.707l-1 1a1 1 0 01-1.414 0z" />
					</motion.g>
					<path d="M12 8h8" />
					<motion.path
						d="M15 20v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3"
						variants={printVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					/>
					<path d="M4 20h16" />
					<path d="M4 22V4a2 2 0 012-2h12a2 2 0 012 2v18" />
					<path d="M4 8h4" />
				</svg>
			</div>
		);
	}
);

Printer3d.displayName = 'Printer3d';

export { Printer3d };
