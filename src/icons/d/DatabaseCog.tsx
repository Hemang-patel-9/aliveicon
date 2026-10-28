'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const gearVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: 90,
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const DatabaseCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={gearVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="m14.305 19.53.923-.382" />
						<path d="m15.228 16.852-.923-.383" />
						<path d="m16.852 15.228-.383-.923" />
						<path d="m16.852 20.772-.383.924" />
						<path d="m19.148 15.228.383-.923" />
						<path d="m19.53 21.696-.382-.924" />
						<path d="m20.772 16.852.924-.383" />
						<path d="m20.772 19.148.924.383" />
						<circle cx="18" cy="18" r="3" />
					</motion.g>
					<path d="M21 10.5V5" />
					<path d="M3 12a9 3 0 0 0 7.599 2.963" />
					<path d="M3 5v14a9 3 0 0 0 8.148 2.987" />
					<ellipse cx="12" cy="5" rx="9" ry="3" />
				</svg>
			</div>
		);
	}
);

DatabaseCog.displayName = 'DatabaseCog';

export { DatabaseCog };
