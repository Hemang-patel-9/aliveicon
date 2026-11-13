'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const handVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: 360,
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const Clock12 = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path
					d="M12 6v6"
					style={{ originX: '50%', originY: '100%' }}
					variants={handVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Clock12.displayName = 'Clock12';

export { Clock12 };
