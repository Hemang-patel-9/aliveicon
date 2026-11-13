'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const barVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, ease: 'easeOut' },
	},
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.25, ease: 'easeOut' },
	},
};

const UserRoundExclamationPoint = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	(props, ref) => {
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
					<path d="M4 21a8 8 0 0111.99-6.934" />
					<circle cx="12" cy="8" r="5" />
					<motion.path d="M19.99 13v4" variants={barVariants} initial="normal" animate={controls} />
					<motion.path
						d="M19.99 21H20"
						variants={dotVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UserRoundExclamationPoint.displayName = 'UserRoundExclamationPoint';

export { UserRoundExclamationPoint };
