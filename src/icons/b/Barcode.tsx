'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const strokeVariants: Variants = {
	normal: { opacity: 1, strokeDashoffset: 0, strokeDasharray: '0 1' },
	animate: {
		strokeDashoffset: [1, 0],
		strokeDasharray: ['0 1', '1 0'],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Barcode = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn(className)}
				style={{
					width: size,
					height: size,
					display: 'inline-block',
					...style,
				}}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{['3', '8', '12', '17', '21'].map((x) => (
						<motion.path
							key={x}
							d={`M${x} 5v14`}
							variants={strokeVariants}
							initial="normal"
							animate={controls}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Barcode.displayName = 'Barcode';

export { Barcode };
