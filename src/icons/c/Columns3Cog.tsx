'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dividerVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const gearVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: 90,
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Columns3Cog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10.6 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.6" />
					<motion.path
						d="M15 3v7.6"
						custom={1}
						variants={dividerVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 3v18"
						custom={0}
						variants={dividerVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.g
						variants={gearVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="m14.305 19.53.923-.382" />
						<path d="m15.229 16.852-.924-.383" />
						<path d="m16.852 15.228-.383-.923" />
						<path d="m16.852 20.772-.383.924" />
						<path d="m19.148 15.228.383-.923" />
						<path d="m19.53 21.696-.382-.924" />
						<path d="m20.773 16.852.922-.383" />
						<path d="m20.773 19.148.922.383" />
						<circle cx="18" cy="18" r="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Columns3Cog.displayName = 'Columns3Cog';

export { Columns3Cog };
