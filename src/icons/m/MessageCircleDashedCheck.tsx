'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.18, 0.96, 1],
		transition: { duration: 0.45, ease: 'easeInOut' },
	},
};

const MessageCircleDashedCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={popVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M10.1 2.182a10 10 0 013.8 0" />
						<path d="M13.9 21.818a10 10 0 01-3.8 0" />
						<path d="M17.609 3.72a10 10 0 012.69 2.7" />
						<path d="M2.182 13.9a10 10 0 010-3.8" />
						<path d="M20.28 17.61a10 10 0 01-2.7 2.69" />
						<path d="M21.818 10.1a10 10 0 010 3.8" />
						<path d="M3.721 6.391a10 10 0 012.7-2.69" />
						<path d="m6.163 21.117-2.906.85a1 1 0 01-1.236-1.169l.965-2.98" />
						<path d="m16 9-5.5 5.5L8 12" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

MessageCircleDashedCheck.displayName = 'MessageCircleDashedCheck';

export { MessageCircleDashedCheck };
