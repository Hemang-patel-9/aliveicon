'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const gearVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 90],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const FileCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z" />
					<path d="M20 8v12a2 2 0 0 1-2 2h-4.182" />
					<motion.g
						variants={gearVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="m3.305 19.53.923-.382" />
						<path d="m4.228 16.852-.924-.383" />
						<path d="m5.852 15.228-.383-.923" />
						<path d="m5.852 20.772-.383.924" />
						<path d="m8.148 15.228.383-.923" />
						<path d="m8.53 21.696-.382-.924" />
						<path d="m9.773 16.852.922-.383" />
						<path d="m9.773 19.148.922.383" />
						<circle cx="7" cy="18" r="3" />
					</motion.g>
					<path d="M4 10.592V4a2 2 0 0 1 2-2h8" />
				</svg>
			</div>
		);
	}
);

FileCog.displayName = 'FileCog';

export { FileCog };
