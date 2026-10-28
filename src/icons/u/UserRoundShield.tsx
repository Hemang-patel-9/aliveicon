'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shieldVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.88, 1],
		transition: { duration: 0.45, ease: 'easeInOut' },
	},
};

const UserRoundShield = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M2 21a8 8 0 0 1 8-8 5 5 0 1 1 4.845-3.759" />
					<motion.path
						d="M22 17.5c0 2.5-1.75 3.75-3.83 4.474a.5.5 0 0 1-.335-.005C15.75 21.25 14 20 14 17.5V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"
						style={{ originX: '50%', originY: '50%' }}
						variants={shieldVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UserRoundShield.displayName = 'UserRoundShield';

export { UserRoundShield };
