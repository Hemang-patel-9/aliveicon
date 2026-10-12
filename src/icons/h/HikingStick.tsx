'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const strikeVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -22, 8, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const HikingStick = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={strikeVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '0%', originY: '100%' }}
					>
						<path d="M13.5 10.5 2 22" />
						<path d="M16.352 11.648a1.205 1.205 0 01-1.704 0l-2.296-2.296a1.205 1.205 0 010-1.704l.72-.72a2 2 0 011.022-.546l.599-.12a2 2 0 001.569-1.57l.12-.598a2 2 0 01.546-1.022l.72-.72a1.205 1.205 0 011.704 0l2.296 2.296a1.205 1.205 0 010 1.704l-6.02 6.02a1 1 0 103 3l.201-.201A7.4 7.4 0 0021 9.93V7" />
						<path d="m6 21-3-3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

HikingStick.displayName = 'HikingStick';

export { HikingStick };
