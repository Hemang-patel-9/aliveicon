'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bubbleVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0.8, 1.1, 1],
		transition: { duration: 0.35, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const Wechat = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.path
						d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a0.59 0.59 0 0 1 0.213 0.665l-0.39 1.48c-0.019 0.07-0.048 0.141-0.048 0.213c0 0.163 0.13 0.295 0.29 0.295a0.326 0.326 0 0 0 0.167-0.054l1.903-1.114a0.864 0.864 0 0 1 0.717-0.098a10.16 10.16 0 0 0 2.837 0.403c0.276 0 0.543-0.027 0.811-0.05c-0.857-2.578 0.157-4.972 1.932-6.446c1.703-1.415 3.882-1.98 5.853-1.838c-0.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c0.642 0 1.162 0.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-0.651 0.52-1.18 1.162-1.18zM11.598 5.991c0.642 0 1.162 0.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178a1.17 1.17 0 0 1-1.162-1.178c0-0.651 0.52-1.18 1.162-1.18z"
						fill="currentColor"
						stroke="none"
						variants={bubbleVariants}
						custom={0}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16.938 8.858c-1.797-0.052-3.746 0.512-5.28 1.786c-1.72 1.428-2.687 3.72-1.78 6.22c0.942 2.453 3.666 4.229 6.884 4.229c0.826 0 1.622-0.12 2.361-0.336a0.722 0.722 0 0 1 0.598 0.082l1.584 0.926a0.272 0.272 0 0 0 0.14 0.047c0.134 0 0.24-0.111 0.24-0.247c0-0.06-0.023-0.12-0.038-0.177l-0.327-1.233a0.582 0.582 0 0 1-0.023-0.156a0.49 0.49 0 0 1 0.201-0.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-0.135-0.01-0.27-0.027-0.407-0.03zM14.408 12.132c0.535 0 0.969 0.44 0.969 0.982a0.976 0.976 0 0 1-0.969 0.983a0.976 0.976 0 0 1-0.969-0.983c0-0.542 0.434-0.982 0.97-0.982zM19.252 12.132c0.535 0 0.969 0.44 0.969 0.982a0.976 0.976 0 0 1-0.969 0.983a0.976 0.976 0 0 1-0.969-0.983c0-0.542 0.434-0.982 0.969-0.982z"
						fill="currentColor"
						stroke="none"
						variants={bubbleVariants}
						custom={1}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Wechat.displayName = 'Wechat';

export { Wechat };
