'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const variants = {
	normal: (d: string) => ({
		d,
		transition: { duration: 0.3 },
	}),
	animate: (dFrames: string[], duration: number) => ({
		d: dFrames,
		transition: {
			duration,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	}),
};

const AudioLines = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M2 10v3" />
					<motion.path
						custom={['M6 6v11', 'M6 10v3', 'M6 6v11']}
						variants={{
							normal: variants.normal('M6 6v11'),
							animate: variants.animate(['M6 6v11', 'M6 10v3', 'M6 6v11'], 1.5),
						}}
						initial="normal"
						animate={controls}
						d="M6 6v11"
					/>
					<motion.path
						custom={['M10 3v18', 'M10 9v5', 'M10 3v18']}
						variants={{
							normal: variants.normal('M10 3v18'),
							animate: variants.animate(['M10 3v18', 'M10 9v5', 'M10 3v18'], 1),
						}}
						initial="normal"
						animate={controls}
						d="M10 3v18"
					/>
					<motion.path
						custom={['M14 8v7', 'M14 6v11', 'M14 8v7']}
						variants={{
							normal: variants.normal('M14 8v7'),
							animate: variants.animate(['M14 8v7', 'M14 6v11', 'M14 8v7'], 0.8),
						}}
						initial="normal"
						animate={controls}
						d="M14 8v7"
					/>
					<motion.path
						custom={['M18 5v13', 'M18 7v9', 'M18 5v13']}
						variants={{
							normal: variants.normal('M18 5v13'),
							animate: variants.animate(['M18 5v13', 'M18 7v9', 'M18 5v13'], 1.5),
						}}
						initial="normal"
						animate={controls}
						d="M18 5v13"
					/>
					<path d="M22 10v3" />
				</svg>
			</div>
		);
	}
);

AudioLines.displayName = 'AudioLines';

export { AudioLines };
