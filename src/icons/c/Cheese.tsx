'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const wedgeVariants: Variants = {
	normal: { scaleX: 1, scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 1.04, 0.98, 1],
		scaleY: [1, 0.92, 1.04, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const holeVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.6, 1.15, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Cheese = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
					variants={wedgeVariants}
					style={{ originX: '50%', originY: '100%' }}
					initial="normal"
					animate={controls}
				>
					<motion.path
						d="M14 11a3 3 0 01-6 0 5 5 0 016 0"
						variants={holeVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<path d="M14.292 2.436a1.55 1.55 0 011.463-.088l.278.13A10.33 10.33 0 0122 11v8a2 2 0 01-2 2h-1.75a.28.28 0 01-.265-.25 2 2 0 00-3.97 0 .28.28 0 01-.265.25H4a2 2 0 01-2-2v-.75a.28.28 0 01.25-.265 2 2 0 00-.046-3.975.21.21 0 01-.204-.214v-2.678a2 2 0 01.952-1.703l6.062-3.732a.3.3 0 01.27-.002A2.5 2.5 0 0013 3.5l-.002-.104a.3.3 0 01.122-.24z" />
					<path d="M22 11h-8" />
					<path d="M8 11H2" />
				</motion.g>
			</svg>
		</div>
	);
});

Cheese.displayName = 'Cheese';

export { Cheese };
