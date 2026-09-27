'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const Bicep = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { rest: 'relax' });

		const pathVariants = {
			relax: { pathLength: 1, opacity: 1, rotate: 0 },
			flex: {
				pathLength: [1, 1.2, 1],
				opacity: [1, 1],
				rotate: [0, -2, 2, -1, 0],
				transition: { duration: 1.2, ease: 'easeInOut' },
			},
		};

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
						d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"
						variants={pathVariants}
						initial="relax"
						animate={controls}
					/>
					<motion.path
						d="M15 14a5 5 0 0 0-7.584 2"
						variants={pathVariants}
						initial="relax"
						animate={controls}
					/>
					<motion.path
						d="M9.964 6.825C8.019 7.977 9.5 13 8 15"
						variants={pathVariants}
						initial="relax"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Bicep.displayName = 'Bicep';
