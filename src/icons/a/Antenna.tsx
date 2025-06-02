'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface AntennaHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AntennaProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;

	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	animationTrigger?: 'manual' | 'hover' | 'click' | 'load';
	delay?: number;
}

const DURATION = 1.2;

// Animate the antenna lines "wiggle" side to side
const pathVariants: Variants = {
	normal: { rotate: 0, originX: '50%', originY: '100%' },
	animate: {
		rotate: [0, 10, -10, 10, 0],
		transition: { duration: DURATION, ease: 'easeInOut', repeat: Infinity },
	},
};

// Animate the horizontal line scaling left and right subtly
const horizontalLineVariants: Variants = {
	normal: { scaleX: 1, originX: 0 },
	animate: {
		scaleX: [1, 1.1, 0.9, 1.1, 1],
		transition: { duration: DURATION, ease: 'easeInOut', repeat: Infinity },
	},
};

// Animate the vertical line pulsing scaleY
const verticalLineVariants: Variants = {
	normal: { scaleY: 1, originY: '100%' },
	animate: {
		scaleY: [1, 1.2, 0.8, 1.2, 1],
		transition: { duration: DURATION, ease: 'easeInOut', repeat: Infinity },
	},
};

const Antenna = forwardRef<AntennaHandle, AntennaProps>(
	(
		{
			className,
			size = 28,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
			animationTrigger = 'hover',
			delay = 0,
			...props
		},
		ref
	) => {
		const controls = useAnimation();
		const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

		const startAnimation = useCallback(() => {
			// Start infinite animation immediately
			controls.start('animate');
		}, [controls]);

		const stopAnimation = useCallback(() => {
			controls.start('normal');
		}, [controls]);

		useImperativeHandle(ref, () => ({
			startAnimation,
			stopAnimation,
		}));

		// Effect to handle auto animation or load-triggered animation with delay
		useEffect(() => {
			if (animationTrigger === 'manual') return; // do nothing automatically

			if (autoAnimateOnLoad || animationTrigger === 'load') {
				timeoutRef.current = setTimeout(() => {
					startAnimation();
				}, delay);
			}

			return () => {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
			};
		}, [autoAnimateOnLoad, animationTrigger, delay, startAnimation]);

		// Handlers for hover and click depending on trigger type and loop setting

		const handleMouseEnter = useCallback(() => {
			if (animationTrigger !== 'hover' || !hoverable) return;
			startAnimation();
		}, [animationTrigger, hoverable, startAnimation]);

		const handleMouseLeave = useCallback(() => {
			if (animationTrigger !== 'hover' || !hoverable) return;
			if (!loopOnHover) {
				stopAnimation();
			}
		}, [animationTrigger, hoverable, loopOnHover, stopAnimation]);

		const handleClick = useCallback(() => {
			if (animationTrigger !== 'click' && !animateOnClick) return;
			startAnimation();
		}, [animationTrigger, animateOnClick, startAnimation]);

		return (
			<div
				className={cn('inline-block', className)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				{...props}
				style={{ width: size, height: size, ...props.style }}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M2 12 7 2"
						variants={pathVariants}
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="m7 12 5-10"
						variants={pathVariants}
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="m12 12 5-10"
						variants={pathVariants}
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="m17 12 5-10"
						variants={pathVariants}
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					/>
					<motion.path
						d="M4.5 7h15"
						variants={horizontalLineVariants}
						animate={controls}
					/>
					<motion.path
						d="M12 16v6"
						variants={verticalLineVariants}
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

Antenna.displayName = 'Antenna';

export { Antenna };