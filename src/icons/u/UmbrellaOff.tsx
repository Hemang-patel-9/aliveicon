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
		duration: 0.45,
		delay: i * 0.12,
		ease: 'easeInOut',
	},
});

const UmbrellaOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, {
			rest: 'visible',
			animate: animateTarget,
		});

		const paths = [
			'M12 2v1',
			'M15.5 21a1.85 1.85 0 0 1-3.5-1v-8H2a10 10 0 0 1 3.428-6.575',
			'M17.5 12H22A10 10 0 0 0 9.004 3.455',
			'm2 2 20 20',
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
					{paths.map((d, i) => (
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

UmbrellaOff.displayName = 'UmbrellaOff';
export { UmbrellaOff };
