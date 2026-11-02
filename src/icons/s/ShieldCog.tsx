'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const turnVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 90, 90, 0],
		transition: { duration: 0.8, times: [0, 0.4, 0.6, 1], ease: 'easeInOut' },
	},
};

const ShieldCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={turnVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="m10.929 14.467-.383.924" />
						<path d="M10.929 8.923 10.546 8" />
						<path d="M13.225 8.923 13.608 8" />
						<path d="m13.607 15.391-.382-.924" />
						<path d="m14.849 10.547.923-.383" />
						<path d="m14.849 12.843.923.383" />
						<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
						<path d="m9.305 10.547-.923-.383" />
						<path d="m9.305 12.843-.923.383" />
						<circle cx="12.077" cy="11.695" r="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ShieldCog.displayName = 'ShieldCog';

export { ShieldCog };
