'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ringVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 45, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const bubbleVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.9, 1.05, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const SignalMessenger = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 0q-0.934 0-1.83 0.139l0.17 1.111a11 11 0 0 1 3.32 0l0.172-1.111A12 12 0 0 0 12 0M9.152 0.34A12 12 0 0 0 5.77 1.742l0.584 0.961a10.8 10.8 0 0 1 3.066-1.27zM14.848 0.34l-0.268 1.094a10.8 10.8 0 0 1 3.066 1.27l0.584-0.962A12 12 0 0 0 14.848 0.34M4.908 2.318a12 12 0 0 0-2.59 2.59l0.909 0.664a11 11 0 0 1 2.345-2.345zM19.092 2.318l-0.664 0.909a11 11 0 0 1 2.345 2.345l0.909-0.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 0.34 9.152l1.094 0.268a10.8 10.8 0 0 1 1.269-3.066zM22.258 5.77l-0.961 0.584a10.8 10.8 0 0 1 1.27 3.066l1.093-0.268a12 12 0 0 0-1.402-3.383M0.138 10.168A12 12 0 0 0 0 12q0 0.934 0.139 1.83l1.111-0.17A11 11 0 0 1 1.125 12q0-0.848 0.125-1.66zM23.861 10.17l-1.111 0.17q0.125 0.812 0.125 1.66c0 0.848-0.042 1.12-0.125 1.66l1.111 0.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094 0.268a12 12 0 0 0 0.96 2.591l-0.265 1.14l1.096 0.255l0.36-1.539l-0.188-0.365a10.8 10.8 0 0 1-0.87-2.35M22.566 14.58a10.8 10.8 0 0 1-1.27 3.067l0.962 0.584a12 12 0 0 0 1.402-3.383zM20.773 18.428a11 11 0 0 1-2.345 2.345l0.664 0.909a12 12 0 0 0 2.59-2.59zM0.814 19.528L0.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-0.455l-0.256-1.095l-1.953 0.455a0.675 0.675 0 0 1-0.81-0.81l0.454-1.954zM17.646 21.297a10.8 10.8 0 0 1-3.066 1.27l0.268 1.093a12 12 0 0 0 3.382-1.402zM6.706 21.51l-1.54 0.36l0.256 1.095l1.139-0.266c0.814 0.415 1.683 0.74 2.591 0.961l0.268-1.094a10.8 10.8 0 0 1-2.35-0.869zM10.34 22.75l-0.172 1.111a12.1 12.1 0 0 0 3.662 0l-0.17-1.111q-0.812 0.125-1.66 0.125a11 11 0 0 1-1.66-0.125"
						fill="currentColor"
						stroke="none"
						variants={ringVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 2.25a9.75 9.75 0 0 0-8.539 14.459c0.074 0.134 0.1 0.292 0.064 0.441l-1.013 4.338l4.338-1.013a0.62 0.62 0 0 1 0.441 0.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25"
						fill="currentColor"
						stroke="none"
						variants={bubbleVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SignalMessenger.displayName = 'SignalMessenger';

export { SignalMessenger };
