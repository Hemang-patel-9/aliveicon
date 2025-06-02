'use client';

import { motion, useAnimation } from 'framer-motion';
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

interface ApertureHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ApertureProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const circleVariants = {
	normal: {
		rotate: 0,
		originX: '50%',
		originY: '50%',
		transition: { duration: 0.4 },
	},
	animate: {
		rotate: [0, 15, -15, 0],
		transition: { duration: 1.2, ease: 'easeInOut' },
	},
};

const bladeVariants = {
	normal: {
		rotate: 0,
		scale: 1,
		opacity: 1,
		originX: '50%',
		originY: '50%',
		transition: { duration: 0.4 },
	},
	animate: {
		rotate: [0, 10, -10, 0],
		scale: [1, 1.1, 0.9, 1],
		opacity: [1, 0.85, 1, 1],
		transition: { duration: 1.2, ease: 'easeInOut' },
	},
};

export const Aperture = forwardRef<ApertureHandle, ApertureProps>(
	(
		{
			size = 28,
			className,
			style,
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
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);
		const isMounted = useRef(true);

		// Recursive animation loop with proper async handling
		const triggerAnimation = useCallback(async () => {
			if (!isMounted.current) return;
			await controls.start('animate');
			if (!isMounted.current) return;
			await controls.start('normal');
			if (loopRef.current && isMounted.current) {
				triggerAnimation();
			}
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) {
				triggerAnimation();
			}
		}, [autoAnimateOnLoad, triggerAnimation]);

		useEffect(() => {
			return () => {
				isMounted.current = false;
			};
		}, []);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		}, [controls]);

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				if (loopOnHover) {
					loopRef.current = true;
					triggerAnimation();
				} else {
					controls.start('animate');
				}
			}
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				loopRef.current = false;
				controls.start('normal');
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && animateOnClick) {
				triggerAnimation();
			}
			onClick?.(e);
		};

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14.31 8 5.74 9.94"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.69 8h11.48"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7.38 12 5.74-9.94"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.69 16 3.95 6.06"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14.31 16H2.83"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m16.62 12-5.74 9.94"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

Aperture.displayName = 'Aperture';
