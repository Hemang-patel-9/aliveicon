'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import type { HTMLAttributes } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface AlarmClockMinusHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlarmClockMinusProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const pathVariants: Variants = {
	normal: {
		y: 0,
		x: 0,
		transition: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
	},
	animate: {
		y: -1.5,
		x: [-1, 1, -1, 1, -1, 0],
		transition: {
			x: { duration: 0.3, repeat: Infinity, ease: 'linear' },
			y: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
		},
	},
};

const secondaryPathVariants: Variants = {
	normal: {
		y: 0,
		x: 0,
		transition: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
	},
	animate: {
		y: -2.5,
		x: [-2, 2, -2, 2, -2, 0],
		transition: {
			x: { duration: 0.3, repeat: Infinity, ease: 'linear' },
			y: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
		},
	},
};

const AlarmClockMinus = forwardRef<AlarmClockMinusHandle, AlarmClockMinusProps>(
	(
		{
			className,
			size = 28,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
			onMouseEnter,
			onMouseLeave,
			onClick,
			...props
		},
		ref
	) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);
		const timeoutRef = useRef<any | null>(null);

		const startAnimation = useCallback(() => {
			controls.start('animate');
		}, [controls]);

		const stopAnimation = useCallback(() => {
			controls.start('normal');
		}, [controls]);

		const startTimedAnimation = useCallback(() => {
			startAnimation();
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				stopAnimation();
			}, 700);
		}, [startAnimation, stopAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => startTimedAnimation(),
				stopAnimation: () => stopAnimation(),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && hoverable) {
					if (loopOnHover) {
						startAnimation();
					} else {
						startTimedAnimation();
					}
				}
				onMouseEnter?.(e);
			},
			[hoverable, loopOnHover, onMouseEnter, startAnimation, startTimedAnimation]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && hoverable && loopOnHover) {
					stopAnimation();
				}
				onMouseLeave?.(e);
			},
			[hoverable, loopOnHover, onMouseLeave, stopAnimation]
		);

		const handleClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && animateOnClick) {
					startTimedAnimation();
				}
				onClick?.(e);
			},
			[animateOnClick, onClick, startTimedAnimation]
		);

		useEffect(() => {
			if (autoAnimateOnLoad) {
				startTimedAnimation();
			}
			return () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}, [autoAnimateOnLoad, startTimedAnimation]);

		return (
			<div
				className={cn(className)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ overflow: 'visible' }}
				>
					<motion.circle
						variants={pathVariants}
						initial="normal"
						animate={controls}
						cx="12"
						cy="13"
						r="8"
					/>
					<motion.path
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
						d="M5 3 2 6"
					/>
					<motion.path
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
						d="m22 6-3-3"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M6.38 18.7 4 21"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M17.64 18.67 20 21"
					/>
					<motion.line
						variants={pathVariants}
						initial="normal"
						animate={controls}
						x1="9"
						y1="13"
						x2="15"
						y2="13"
					/>
				</svg>
			</div>
		);
	}
);

AlarmClockMinus.displayName = 'AlarmClockMinus';
export { AlarmClockMinus };
