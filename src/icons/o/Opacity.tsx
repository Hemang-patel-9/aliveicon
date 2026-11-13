'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cornerVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const dotVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: (band: number) => ({
		opacity: [1, 0.15, 1],
		transition: { duration: 0.6, delay: band * 0.12, ease: 'easeInOut' },
	}),
};

const dots: [string, number][] = [
	['M12 3h.01', 1],
	['M12 9h.01', 2],
	['M15 6h.01', 2],
	['M18 3h.01', 2],
	['M3 12h.01', 1],
	['M3 18h.01', 2],
	['M3 6h.01', 0],
	['M6 15h.01', 2],
	['M6 3h.01', 0],
	['M6 9h.01', 1],
	['M9 12h.01', 2],
	['M9 6h.01', 1],
];

const Opacity = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	return (
		<div {...iconProps}>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				width="100%"
				height="100%"
			>
				<motion.path
					d="M21 6v13a2 2 0 0 1-2 2H6"
					variants={cornerVariants}
					initial="normal"
					animate={controls}
				/>
				{dots.map(([d, band]) => (
					<motion.path
						key={d}
						d={d}
						variants={dotVariants}
						custom={band}
						initial="normal"
						animate={controls}
					/>
				))}
			</svg>
		</div>
	);
});

Opacity.displayName = 'Opacity';

export { Opacity };
