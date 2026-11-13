'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bounceVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -3, 0, -1.5, 0],
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

const Sunrise = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.g
					variants={bounceVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path d="M12 2v8" />
					<path d="m4.93 10.93 1.41 1.41" />
					<path d="M2 18h2" />
					<path d="M20 18h2" />
					<path d="m19.07 10.93-1.41 1.41" />
					<path d="M22 22H2" />
					<path d="m8 6 4-4 4 4" />
					<path d="M16 18a4 4 0 0 0-8 0" />
				</motion.g>
			</svg>
		</div>
	);
});

Sunrise.displayName = 'Sunrise';

export { Sunrise };
