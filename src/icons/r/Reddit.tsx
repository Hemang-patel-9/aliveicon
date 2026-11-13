'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const headVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -6, 4, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const blinkVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		scaleY: [1, 1, 0.15, 1],
		transition: { duration: 0.7, times: [0, 0.5, 0.7, 1], ease: 'easeInOut' },
	},
};

const Reddit = forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
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
				style={{ overflow: 'visible' }}
			>
				<motion.g
					variants={headVariants}
					style={{ originX: '50%', originY: '50%' }}
					initial="normal"
					animate={controls}
				>
					<path
						d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C0.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0ZM16.388 3.199c1.104 0 1.999 0.895 1.999 1.999c0 1.105-0.895 2-1.999 2c-0.946 0-1.739-0.657-1.947-1.539v0.002c-1.147 0.162-2.032 1.15-2.032 2.341v0.007c1.776 0.067 3.4 0.567 4.686 1.363c0.473-0.363 1.064-0.58 1.707-0.58c1.547 0 2.802 1.254 2.802 2.802c0 1.117-0.655 2.081-1.601 2.531c-0.088 3.256-3.637 5.876-7.997 5.876c-4.361 0-7.905-2.617-7.998-5.87c-0.954-0.447-1.614-1.415-1.614-2.538c0-1.548 1.255-2.802 2.803-2.802c0.645 0 1.239 0.218 1.712 0.585c1.275-0.79 2.881-1.291 4.64-1.365v-0.01c0-1.663 1.263-3.034 2.88-3.207c0.188-0.911 0.993-1.595 1.959-1.595ZM12.006 15.588c-0.974 0-1.907 0.048-2.77 0.135c-0.147 0.015-0.241 0.168-0.183 0.305c0.483 1.154 1.622 1.964 2.953 1.964c1.33 0 2.47-0.81 2.953-1.964c0.057-0.137-0.037-0.29-0.184-0.305c-0.863-0.087-1.795-0.135-2.769-0.135Z"
						fill="currentColor"
						stroke="none"
					/>
					<motion.path
						d="M8.303 11.575c-0.784 0-1.459 0.78-1.506 1.797c-0.047 1.016 0.64 1.429 1.426 1.429c0.786 0 1.371-0.369 1.418-1.385c0.047-1.017-0.553-1.841-1.338-1.841ZM15.709 11.575c-0.786 0-1.385 0.824-1.338 1.841c0.047 1.017 0.634 1.385 1.418 1.385c0.785 0 1.473-0.413 1.426-1.429c-0.046-1.017-0.721-1.797-1.506-1.797Z"
						fill="currentColor"
						stroke="none"
						variants={blinkVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
				</motion.g>
			</svg>
		</div>
	);
});

Reddit.displayName = 'Reddit';

export { Reddit };
