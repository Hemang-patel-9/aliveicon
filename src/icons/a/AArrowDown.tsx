'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bounceVariant = {
	normal: {
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 15,
		},
	},
	animate: {
		scale: 1.2,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 10,
		},
	},
};

const lineVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			opacity: { duration: 0.1 },
		},
	},
};

const bouncePathVariants = {
	hidden: {
		pathLength: 0,
		opacity: 0,
	},
	visible: (i: number) => ({
		pathLength: 1,
		opacity: 1,
		transition: {
			pathLength: { delay: i * 0.1, duration: 0.4, ease: 'easeInOut' },
			opacity: { delay: i * 0.1, duration: 0.2 },
		},
	}),
};

const paths = ['M3.5 13h6', 'm2 16 4.5-9 4.5 9', 'M18 7v9', 'm14 12 4 4 4-4'];

export interface AArrowDownProps extends AnimatedIconProps {
	isBounce?: boolean;
}

const AArrowDown = forwardRef<AnimatedIconHandle, AArrowDownProps>(
	({ className, size = 28, style, isBounce = false, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<motion.svg
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
					variants={isBounce ? bounceVariant : undefined}
					animate={isBounce ? controls : undefined}
					initial={isBounce ? 'normal' : undefined}
				>
					{paths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							variants={isBounce ? bouncePathVariants : lineVariants}
							initial={isBounce ? 'hidden' : 'normal'}
							animate={isBounce ? 'visible' : controls}
							custom={i}
						/>
					))}
				</motion.svg>
			</div>
		);
	}
);

AArrowDown.displayName = 'AArrowDown';

export { AArrowDown };
