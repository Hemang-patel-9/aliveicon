'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bodyVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.25 } },
	animate: {
		rotate: [0, -8, 6, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const chipVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0.3, 1.6, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: i * 0.07, ease: 'easeOut' },
	}),
};

const Cookie = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M11.496 2c.324-.016.558.292.529.615a4 4 0 004.235 4.368.713.713 0 01.758.757 4 4 0 004.366 4.237c.323-.03.63.204.614.527a10 10 0 01-2.915 6.566A1 1 0 114.93 4.918 10 10 0 0111.496 2"
						style={{ originX: '50%', originY: '50%' }}
						variants={bodyVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11 17h.01"
						custom={0}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 12h.01"
						custom={1}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 16h.01"
						custom={2}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 3h.01"
						custom={3}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 4h.01"
						custom={4}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 8h.01"
						custom={5}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 14h.01"
						custom={6}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 8h.01"
						custom={7}
						variants={chipVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Cookie.displayName = 'Cookie';

export { Cookie };
