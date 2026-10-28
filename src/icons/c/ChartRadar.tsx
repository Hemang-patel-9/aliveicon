'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const radarVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.4, 1],
		opacity: [0, 1],
		transition: { duration: 0.55, ease: 'easeOut' },
	},
};

const ChartRadar = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M12 2v10" />
					<motion.path
						d="m16 18 3.085-8.125L12 4.103 3.473 9.442l3.196 10.554z"
						style={{ originX: '50%', originY: '50%' }}
						variants={radarVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="m2 9 10 3 6 9" />
					<path d="m6 21 6-9 10-3" />
				</svg>
			</div>
		);
	}
);

ChartRadar.displayName = 'ChartRadar';

export { ChartRadar };
