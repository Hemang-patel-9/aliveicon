'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.18, 0.96, 1],
		transition: { duration: 0.45, ease: 'easeInOut' },
	},
};

const SirenOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={popVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M12 12v6" />
						<path d="M12 2v1" />
						<path d="M12.707 7.05a5 5 0 0 1 4.243 4.243" />
						<path d="M17 17v1H7a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2" />
						<path d="M18.5 4.5 18 5" />
						<path d="M2 12h1" />
						<path d="m2 2 20 20" />
						<path d="M21 12h1" />
						<path d="M7 18v-6a5 5 0 0 1 1.464-3.536" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

SirenOff.displayName = 'SirenOff';

export { SirenOff };
