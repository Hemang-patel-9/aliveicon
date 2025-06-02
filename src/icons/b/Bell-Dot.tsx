'use client';

import { motion, useAnimation } from 'framer-motion';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface BellDotHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BellDotProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const BellDot = forwardRef<BellDotHandle, BellDotProps>(
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

		// Swing animation keyframes for bell swing rotation
		const swingAnimation = {
			normal: { rotate: 0, transition: { duration: 0.3 } },
			animate: {
				rotate: [0, 15, -10, 10, -5, 0],
				transition: {
					duration: 1,
					ease: 'easeInOut',
				},
			},
		};

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			await controls.start('normal');
			if (loopRef.current) triggerAnimation();
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		});

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
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
					animate={controls}
					initial="normal"
					variants={swingAnimation}
					style={{ originX: '50%', originY: '0%' }} // Swing pivot top center
				>
					<path d="M10.268 21a2 2 0 0 0 3.464 0" />
					<path d="M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665" />
					<circle cx="18" cy="8" r="3" />
				</motion.svg>
			</div>
		);

		function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		}

		function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
			if (!isControlledRef.current && hoverable) controls.start('normal');
			onMouseLeave?.(e);
		}

		function handleClick(e: React.MouseEvent<HTMLDivElement>) {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		}
	}
);

BellDot.displayName = 'BellDot';
