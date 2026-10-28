'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const digitVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const reverseDigitVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const Numbers = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m10 4 2.6-1.95a.25.25 0 01.4.2V10"
						custom={0}
						variants={digitVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 14.535A4 4 0 0118 14a2 2 0 010 4 2 2 0 010 4 4 4 0 01-2-.535"
						custom={2}
						variants={digitVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 22H4.5a.5.5 0 01-.5-.5c0-2.68 4-2.932 4-5.5a2 2 0 00-2-2 2.5 2.5 0 00-2 1"
						custom={1}
						variants={reverseDigitVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Numbers.displayName = 'Numbers';

export { Numbers };
