'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const sealVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0.4, 1.2, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.45, ease: 'easeOut' },
	},
};

const lineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, delay: 0.3 + i * 0.12, ease: 'easeOut' },
	}),
};

const Certificate = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M12 10H6"
						custom={0}
						variants={lineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.g
						variants={sealVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="m20.69 15.479 1.29 4.88a.5.5 0 01-.698.591l-1.843-.849a1 1 0 00-.879.001l-1.846.85a.5.5 0 01-.692-.593l1.29-4.88" />
						<circle cx="19" cy="13" r="3" />
					</motion.g>
					<path d="M22 6.675V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h8" />
					<motion.path
						d="M6 14h4"
						custom={1}
						variants={lineVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Certificate.displayName = 'Certificate';

export { Certificate };
