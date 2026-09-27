'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon, type AnimationDefinition } from '../../lib/use-animated-icon';

const animateTarget: AnimationDefinition = (i) => ({
	pathLength: [0, 1],
	opacity: [0, 1],
	transition: {
		duration: 0.5,
		delay: i * 0.08,
		ease: 'easeInOut',
	},
});

const Vault = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const animatedPaths = [
			'M3 3h18v18H3z',
			'M7.9 7.9l2.7 2.7',
			'M13.4 10.6l2.7-2.7',
			'M7.9 16.1l2.7-2.7',
			'M13.4 13.4l2.7 2.7',
			'M12 10a2 2 0 1 0 0 4a2 2 0 0 0 0-4',
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
					<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
					<circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
					<circle cx="16.5" cy="16.5" r=".5" fill="currentColor" />

					{animatedPaths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="visible"
							animate={controls}
							custom={i}
							variants={{ visible: { pathLength: 1, opacity: 1 } }}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Vault.displayName = 'Vault';
export { Vault };
