'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rollVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: ([angle, delay]: [number, number]) => ({
		rotate: [0, angle],
		transition: { duration: 0.7, delay, ease: 'easeInOut' },
	}),
};

const Tablets = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={rollVariants} custom={[-180, 0]} initial="normal" animate={controls}>
						<circle cx="7" cy="7" r="5" />
						<path d="m3.46 10.54 7.08-7.08" />
					</motion.g>
					<motion.g variants={rollVariants} custom={[180, 0.1]} initial="normal" animate={controls}>
						<circle cx="17" cy="17" r="5" />
						<path d="M12 17h10" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Tablets.displayName = 'Tablets';

export { Tablets };
