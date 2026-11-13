'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dotVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scaleX: [0.6, 1.1, 1],
		transition: { duration: 0.35, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const Medium = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-0.137 0.013-0.278 0.02-0.422 0.02c-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 0.022-0.708c0.093-1.186 0.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c0.468-0.237 1.127-0.367 1.664-0.367h0.023c0.101 0 0.202 0.004 0.303 0.01V4.211A4.201 4.201 0 0 0 19.79 0ZM4.408 5.583h4.165l3.588 8.435l3.59-8.435h3.864v0.146l-0.019 0.004c-0.705 0.16-1.063 0.397-1.063 1.254h-0.003l0.003 10.274c0.06 0.676 0.424 0.885 1.063 1.03l0.02 0.004v0.145h-4.923v-0.145l0.019-0.005c0.639-0.144 0.994-0.353 1.054-1.03V7.267l-4.745 11.15h-0.261L6.15 7.569v9.445c0 0.857 0.358 1.094 1.063 1.253l0.02 0.004v0.147H4.405v-0.147l0.019-0.004c0.705-0.16 1.065-0.397 1.065-1.253V6.987c0-0.857-0.358-1.094-1.064-1.254l-0.018-0.004z"
					fill="currentColor"
					stroke="none"
					variants={dotVariants}
					custom={0}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M23.658 9.251c-1.086 0.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-0.342-0.047Z"
					fill="currentColor"
					stroke="none"
					variants={dotVariants}
					custom={1}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M21.796 12.883c-0.1 1.756 0.86 3.239 2.204 3.634v-3.634z"
					fill="currentColor"
					stroke="none"
					variants={dotVariants}
					custom={2}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

Medium.displayName = 'Medium';

export { Medium };
