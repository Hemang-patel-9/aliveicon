'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const turn45Variants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 45],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const WifiCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={turn45Variants}
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
					<motion.path
						d="M2 8.82a15 15 0 0120 0"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M5 12.859a10 10 0 0110.18-2.342"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M8.5 16.429a5 5 0 011.998-1.2"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
				</svg>
			</div>
		);
	}
);

WifiCog.displayName = 'WifiCog';

export { WifiCog };
