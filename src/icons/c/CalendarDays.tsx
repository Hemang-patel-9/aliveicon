'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const CalendarDays = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<motion.path d="M8 2v3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.path d="M16 2v3" variants={pathVariants} initial="normal" animate={controls} />
				<motion.rect
					width="18"
					height="18"
					x="3"
					y="3"
					rx="2"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path d="M3 9h18" variants={pathVariants} initial="normal" animate={controls} />
				{['M8 13h.01', 'M12 13h.01', 'M16 13h.01', 'M8 17h.01', 'M12 17h.01', 'M16 17h.01'].map(
					(d, i) => (
						<motion.path
							key={i}
							d={d}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					)
				)}
			</svg>
		</div>
	);
});

CalendarDays.displayName = 'CalendarDays';
