'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const BrainCircuit = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const paths = [
			'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z',
			'M9 13a4.5 4.5 0 0 0 3-4',
			'M6.003 5.125A3 3 0 0 0 6.401 6.5',
			'M3.477 10.896a4 4 0 0 1 .585-.396',
			'M6 18a4 4 0 0 1-1.967-.516',
			'M12 13h4',
			'M12 18h6a2 2 0 0 1 2 2v1',
			'M12 8h8',
			'M16 8V5a2 2 0 0 1 2-2',
		];

		const circles = [
			{ cx: 16, cy: 13, r: 0.5 },
			{ cx: 18, cy: 3, r: 0.5 },
			{ cx: 20, cy: 21, r: 0.5 },
			{ cx: 20, cy: 8, r: 0.5 },
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
							key={`path-${i}`}
							d={d}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					))}
					{circles.map((c, i) => (
						<motion.circle
							key={`circle-${i}`}
							cx={c.cx}
							cy={c.cy}
							r={c.r}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					))}
				</svg>
			</div>
		);
	}
);

BrainCircuit.displayName = 'BrainCircuit';
