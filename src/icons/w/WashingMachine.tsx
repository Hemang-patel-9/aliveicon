'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const WashingMachine = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					{[
						'M3 6h3',
						'M17 6h.01',
						'M3 2h18a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
					].map((d, i) => (
						<motion.path
							key={i}
							d={d}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					))}

					<motion.circle
						cx="12"
						cy="13"
						r="5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>

					<motion.path
						d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

WashingMachine.displayName = 'WashingMachine';
