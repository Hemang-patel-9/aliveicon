'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const moonVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.25 } },
	animate: {
		rotate: [0, -10, 6, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const dropVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [-3, 0],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.2 + i * 0.12, ease: 'easeOut' },
	}),
};

const CloudMoonRain = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M11 20v2"
						custom={0}
						variants={dropVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"
						style={{ originX: '50%', originY: '50%' }}
						variants={moonVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" />
					<motion.path
						d="M7 19v2"
						custom={1}
						variants={dropVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CloudMoonRain.displayName = 'CloudMoonRain';

export { CloudMoonRain };
