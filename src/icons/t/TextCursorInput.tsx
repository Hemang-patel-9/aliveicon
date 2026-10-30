'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const blinkVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: {
		opacity: [1, 0.1, 1, 0.1, 1],
		transition: { duration: 0.8, ease: 'linear' },
	},
};

const TextCursorInput = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6"
						variants={blinkVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" />
					<path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" />
					<motion.path
						d="M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1"
						variants={blinkVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M9 6v12" variants={blinkVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

TextCursorInput.displayName = 'TextCursorInput';

export { TextCursorInput };
