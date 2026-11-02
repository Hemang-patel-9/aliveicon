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

const MonitorCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						<path d="M12 17v4" />
						<path d="m14.305 7.53.923-.382" />
						<path d="m15.228 4.852-.923-.383" />
						<path d="m16.852 3.228-.383-.924" />
						<path d="m16.852 8.772-.383.923" />
						<path d="m19.148 3.228.383-.924" />
						<path d="m19.53 9.696-.382-.924" />
						<path d="m20.772 4.852.924-.383" />
						<path d="m20.772 7.148.924.383" />
						<path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
						<path d="M8 21h8" />
						<circle cx="18" cy="6" r="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

MonitorCog.displayName = 'MonitorCog';

export { MonitorCog };
