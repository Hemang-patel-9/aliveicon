'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const turn45Variants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 45],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const BrainCog = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				<path d="m10.852 14.772-.383.923" />
				<path d="m10.852 9.228-.383-.923" />
				<path d="m13.148 14.772.382.924" />
				<path d="m13.53 8.305-.382.923" />
				<path d="m14.772 10.852.923-.383" />
				<path d="m14.772 13.148.923.383" />
				<path d="m9.228 10.852-.923-.383" />
				<path d="m9.228 13.148-.923.383" />
				<circle cx="12" cy="12" r="3" />
				<motion.path
					d="M6.293 6.294a3 3 0 01-.287-1.098l-.004-.07a3 3 0 015.968-.543c.05.02.057.01.059 0a3 3 0 015.968.542l-.004.071a3 3 0 01-.287 1.098"
					variants={drawVariants}
					custom={0}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M17.997 5.125a4 4 0 012.526 5.77"
					variants={drawVariants}
					custom={1}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M18 18a4 4 0 002-7.464"
					variants={drawVariants}
					custom={2}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M4.033 17.483A4 4 0 0011.46 20c.184-.31.896-.31 1.076 0a4 4 0 007.43-2.517"
					variants={drawVariants}
					custom={3}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M6 18a4 4 0 01-2-7.464"
					variants={drawVariants}
					custom={4}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M6.002 5.125a4 4 0 00-2.525 5.77"
					variants={drawVariants}
					custom={4}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

BrainCog.displayName = 'BrainCog';

export { BrainCog };
