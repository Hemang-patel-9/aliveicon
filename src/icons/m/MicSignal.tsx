'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const wiggleVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 2, -1.5, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const MicSignal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={wiggleVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M12 17v4" />
						<path d="M18 11a6 6 0 00-3-5.197" />
						<path d="M2 11a10 10 0 015-8.662" />
						<path d="M22 11a10 10 0 00-5-8.662" />
						<path d="M6 11a6 6 0 013-5.197" />
						<path d="M9 21h6" />
						<rect x="10" y="9" width="4" height="8" rx="2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

MicSignal.displayName = 'MicSignal';

export { MicSignal };
