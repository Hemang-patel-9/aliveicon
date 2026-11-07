'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pressVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.8, 1.1, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const checkVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0, 1.3, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.3 + i * 0.15, ease: 'easeOut' },
	}),
};

const dotVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [1, 0.2, 1],
		transition: { duration: 0.5, delay: 0.3, ease: 'easeInOut' },
	},
};

const GithubActions = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
				>
					<path
						d="M24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zM9 20.5c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zM14 12.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zM23 12.5c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zM24 20.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zM23 20.5c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z"
						fill="currentColor"
						stroke="none"
					/>
					<motion.path
						d="M4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zM6.557 5.016L4 6.602V3.406l2.557 1.61z"
						fill="currentColor"
						stroke="none"
						variants={pressVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146z"
						fill="currentColor"
						stroke="none"
						variants={checkVariants}
						custom={0}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.337 13.689l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001z"
						fill="currentColor"
						stroke="none"
						variants={checkVariants}
						custom={1}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 20.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zM12 20.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0z"
						fill="currentColor"
						stroke="none"
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GithubActions.displayName = 'GithubActions';

export { GithubActions };
