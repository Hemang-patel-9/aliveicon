'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ZoomOut = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props);

	const pathVariants: Variants = {
		normal: { pathLength: 1, opacity: 1 },
		animate: (i: number) => ({
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: {
				delay: i * 0.15,
				duration: 0.5,
				ease: 'easeInOut',
			},
		}),
	};

	const paths: { d: string; key: string }[] = [
		{ d: 'M21 21l-4.35-4.35', key: 'zoom-line' },
		{ d: 'M8 11h6', key: 'horizontal-line' },
	];

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
				<motion.circle
					cx="11"
					cy="11"
					r="8"
					variants={pathVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				{paths.map((p, i) => (
					<motion.path
						key={p.key}
						d={p.d}
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={i + 1}
					/>
				))}
			</svg>
		</div>
	);
});

ZoomOut.displayName = 'ZoomOut';
export { ZoomOut };
