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

const ServerCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						<path d="m10.852 14.772-.383.923" />
						<path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923" />
						<path d="m13.148 9.228.383-.923" />
						<path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544" />
						<path d="m14.772 10.852.923-.383" />
						<path d="m14.772 13.148.923.383" />
						<path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5" />
						<path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5" />
						<path d="M6 18h.01" />
						<path d="M6 6h.01" />
						<path d="m9.228 10.852-.923-.383" />
						<path d="m9.228 13.148-.923.383" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ServerCog.displayName = 'ServerCog';

export { ServerCog };
