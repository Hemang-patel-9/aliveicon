'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cogVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: 60,
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Cog = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={cogVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M11 10.27 7 3.34" />
						<path d="m11 13.73-4 6.93" />
						<path d="M12 22v-2" />
						<path d="M12 2v2" />
						<path d="M14 12h8" />
						<path d="m17 20.66-1-1.73" />
						<path d="m17 3.34-1 1.73" />
						<path d="M2 12h2" />
						<path d="m20.66 17-1.73-1" />
						<path d="m20.66 7-1.73 1" />
						<path d="m3.34 17 1.73-1" />
						<path d="m3.34 7 1.73 1" />
						<circle cx="12" cy="12" r="2" />
						<circle cx="12" cy="12" r="8" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Cog.displayName = 'Cog';

export { Cog };
