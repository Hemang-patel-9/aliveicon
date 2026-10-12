'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const upSmallVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const HandPlatter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M12 3V2" variants={upSmallVariants} initial="normal" animate={controls} />
					<path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" />
					<path d="M2 14h12a2 2 0 0 1 0 4h-2" />
					<motion.path
						d="M4 10h16"
						variants={upSmallVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 10a7 7 0 0 1 14 0"
						variants={upSmallVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M5 14v6a1 1 0 0 1-1 1H2" />
				</svg>
			</div>
		);
	}
);

HandPlatter.displayName = 'HandPlatter';

export { HandPlatter };
