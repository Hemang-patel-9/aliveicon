'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const DURATION = 1.2;

const rodVariants: Variants = {
	normal: { rotate: 0, originX: '50%', originY: '100%' },
	animate: {
		rotate: [0, 5, -5, 5, 0],
		transition: { duration: DURATION, ease: 'easeInOut', repeat: Infinity },
	},
};

const horizontalLineVariants: Variants = {
	normal: { scaleX: 1, originX: 0 },
	animate: {
		scaleX: [1, 1.1, 0.9, 1.1, 1],
		transition: { duration: DURATION, ease: 'easeInOut', repeat: Infinity },
	},
};

const verticalLineVariants: Variants = {
	normal: { scaleY: 1, originY: '100%' },
	animate: {
		scaleY: [1, 1.2, 0.8, 1.2, 1],
		transition: { duration: DURATION, ease: 'easeInOut', repeat: Infinity },
	},
};

const Antenna = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
	const { controls, iconProps, strokeWidth } = useAnimatedIcon(ref, props, {
		cycleMs: DURATION * 1000,
	});

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
					d="M2 12 7 2"
					variants={rodVariants}
					initial="normal"
					animate={controls}
					style={{ originX: '50%', originY: '100%' }}
				/>
				<motion.path
					d="m7 12 5-10"
					variants={rodVariants}
					initial="normal"
					animate={controls}
					style={{ originX: '50%', originY: '100%' }}
				/>
				<motion.path
					d="m12 12 5-10"
					variants={rodVariants}
					initial="normal"
					animate={controls}
					style={{ originX: '50%', originY: '100%' }}
				/>
				<motion.path
					d="m17 12 5-10"
					variants={rodVariants}
					initial="normal"
					animate={controls}
					style={{ originX: '50%', originY: '100%' }}
				/>
				<motion.path
					d="M4.5 7h15"
					variants={horizontalLineVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M12 16v6"
					variants={verticalLineVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Antenna.displayName = 'Antenna';

export { Antenna };
