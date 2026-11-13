'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const hourVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [-153.43, 0],
		transition: { duration: 0.57, ease: 'easeInOut' },
	},
};

const Clock5 = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<circle cx="12" cy="12" r="10" />
				<path d="M12 6v6" />
				<motion.path
					d="M12 12l2 4"
					style={{ originX: '0%', originY: '0%' }}
					variants={hourVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Clock5.displayName = 'Clock5';

export { Clock5 };
