'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const downVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Import = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M12 3v12" variants={downVariants} initial="normal" animate={controls} />
					<motion.path
						d="m8 11 4 4 4-4"
						variants={downVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
				</svg>
			</div>
		);
	}
);

Import.displayName = 'Import';

export { Import };
