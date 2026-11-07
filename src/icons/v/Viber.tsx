'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ringVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -15, 12, -8, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const waveVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		opacity: [1, 0, 1],
		transition: { duration: 0.4, delay: 0.1 + i * 0.1, ease: 'easeInOut' },
	}),
};

const Viber = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path
						d="M11.4 0C9.473 0.028 5.333 0.344 3.02 2.467C1.302 4.187 0.696 6.7 0.633 9.817C0.57 12.933 0.488 18.776 6.12 20.36h0.003l-0.004 2.416s-0.037 0.977 0.61 1.177c0.777 0.242 1.234-0.5 1.98-1.302c0.407-0.44 0.972-1.084 1.397-1.58c3.85 0.326 6.812-0.416 7.15-0.525c0.776-0.252 5.176-0.816 5.892-6.657c0.74-6.02-0.36-9.83-2.34-11.546c-0.596-0.55-3.006-2.3-8.375-2.323c0 0-0.395-0.025-1.037-0.017zM11.458 1.693c0.545-0.004 0.88 0.017 0.88 0.017c4.542 0.02 6.717 1.388 7.222 1.846c1.675 1.435 2.53 4.868 1.906 9.897v0.002c-0.604 4.878-4.174 5.184-4.832 5.395c-0.28 0.09-2.882 0.737-6.153 0.524c0 0-2.436 2.94-3.197 3.704c-0.12 0.12-0.26 0.167-0.352 0.144c-0.13-0.033-0.166-0.188-0.165-0.414l0.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895c0.054-2.604 0.543-4.738 1.996-6.173c1.96-1.773 5.474-2.018 7.11-2.03z"
						fill="currentColor"
						stroke="none"
					/>
					<motion.path
						d="M7.878 4.99c-0.19-0.032-0.4 0.005-0.616 0.117l-0.01 0.002c-0.43 0.247-0.816 0.562-1.146 0.932c-0.002 0.004-0.006 0.004-0.008 0.008c-0.267 0.323-0.42 0.638-0.46 0.948c-0.008 0.046-0.01 0.093-0.007 0.14c0 0.136 0.022 0.27 0.065 0.4l0.013 0.01c0.135 0.48 0.473 1.276 1.205 2.604c0.42 0.768 0.903 1.5 1.446 2.186c0.27 0.344 0.56 0.673 0.87 0.984l0.132 0.132c0.31 0.308 0.64 0.6 0.984 0.87c0.686 0.543 1.418 1.027 2.186 1.447c1.328 0.733 2.126 1.07 2.604 1.206l0.01 0.014c0.13 0.042 0.265 0.064 0.402 0.063c0.046 0.002 0.092 0 0.138-0.008c0.31-0.036 0.627-0.19 0.948-0.46c0.004 0 0.003-0.002 0.008-0.005c0.37-0.33 0.683-0.72 0.93-1.148l0.003-0.01c0.225-0.432 0.15-0.842-0.18-1.12c-0.004 0-0.698-0.58-1.037-0.83c-0.36-0.255-0.73-0.492-1.113-0.71c-0.51-0.285-1.032-0.106-1.248 0.174l-0.447 0.564c-0.23 0.283-0.657 0.246-0.657 0.246c-3.12-0.796-3.955-3.955-3.955-3.955s-0.037-0.426 0.248-0.656l0.563-0.448c0.277-0.215 0.456-0.737 0.17-1.248c-0.217-0.383-0.454-0.756-0.71-1.115c-0.25-0.34-0.826-1.033-0.83-1.035c-0.137-0.165-0.31-0.265-0.502-0.297z"
						fill="currentColor"
						stroke="none"
						variants={ringVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12.831 7.5c-0.16 0.002-0.29 0.127-0.3 0.287c-0.008 0.167 0.12 0.31 0.288 0.32c0.523 0.028 0.875 0.175 1.113 0.422c0.24 0.245 0.388 0.62 0.416 1.164c0.01 0.167 0.15 0.295 0.318 0.287c0.167-0.008 0.295-0.15 0.287-0.317c-0.03-0.644-0.215-1.178-0.58-1.557c-0.367-0.378-0.893-0.574-1.52-0.607h-0.018z"
						fill="currentColor"
						stroke="none"
						variants={waveVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12.368 5.87c-0.158 0.002-0.29 0.124-0.3 0.282c-0.01 0.167 0.115 0.312 0.282 0.324c1.16 0.085 2.017 0.466 2.645 1.15c0.63 0.688 0.93 1.524 0.906 2.57c-0.002 0.168 0.13 0.306 0.3 0.31c0.166 0.003 0.305-0.13 0.31-0.297c0.025-1.175-0.334-2.193-1.067-2.994c-0.74-0.81-1.777-1.253-3.05-1.346h-0.024z"
						fill="currentColor"
						stroke="none"
						variants={waveVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11.838 4.295c-0.167 0-0.303 0.135-0.304 0.302c0 0.167 0.133 0.303 0.3 0.305c1.624 0.01 2.946 0.537 4.028 1.592c1.073 1.046 1.62 2.468 1.633 4.334c0.002 0.167 0.14 0.3 0.307 0.3c0.166-0.002 0.3-0.138 0.3-0.304c-0.014-1.984-0.618-3.596-1.816-4.764c-1.19-1.16-2.692-1.753-4.447-1.765z"
						fill="currentColor"
						stroke="none"
						variants={waveVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Viber.displayName = 'Viber';

export { Viber };
