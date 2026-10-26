'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.05, ease: 'easeInOut' },
	}),
};

const slashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.5, ease: 'easeInOut' },
	},
};

const BrainOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const paths = [
			'M12 18v-6',
			'M12 5v1.344',
			'M17.707 6.293A3 3 0 1012 5a3 3 0 00-4.124-2.781',
			'M17.997 5.125a4 4 0 012.526 5.77',
			'M19.644 19.644A4 4 0 0112 18a4 4 0 11-7.967-.517',
			'M20 10.536a4 4 0 011.533 5.34',
			'M3.477 10.895a4 4 0 011.876-5.542',
			'M6 18a4 4 0 01-2-7.464',
			'M9 13a4.17 4.17 0 002.166-1.5 4 4 0 00.138-.196',
		];

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
					{paths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							variants={drawVariants}
							custom={i}
							initial="normal"
							animate={controls}
						/>
					))}
					<motion.path
						d="m2 2 20 20"
						variants={slashVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BrainOff.displayName = 'BrainOff';

export { BrainOff };
