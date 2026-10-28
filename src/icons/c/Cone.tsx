'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const coneVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.25 } },
	animate: {
		rotate: [0, -5, 3, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Cone = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={coneVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" />
						<ellipse cx="12" cy="19" rx="9" ry="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Cone.displayName = 'Cone';

export { Cone };
