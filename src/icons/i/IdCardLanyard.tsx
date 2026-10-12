'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swingVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -6, 5, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const IdCardLanyard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={swingVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '0%' }}
					>
						<path d="M13.5 8h-3" />
						<path d="m15 2-1 2h3a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h3" />
						<path d="M16 22a4 4 0 00-8 0" />
						<path d="m9 2 3 6" />
						<circle cx="12" cy="15" r="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

IdCardLanyard.displayName = 'IdCardLanyard';

export { IdCardLanyard };
