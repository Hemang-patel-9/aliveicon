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

const MidiPort = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					<path d="M12 18h.01" />
					<path d="M15 2.458V5a1 1 0 01-1 1h-4a1 1 0 01-1-1V2.458" />
					<path d="M16 16h.01" />
					<path d="M18 12h.01" />
					<path d="M6 12h.01" />
					<path d="M8 16h.01" />
					<circle cx="12" cy="12" r="10" />
				</motion.g>
			</svg>
		</div>
	);
});

MidiPort.displayName = 'MidiPort';

export { MidiPort };
