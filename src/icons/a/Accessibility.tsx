'use client';
import { useAnimation, motion } from 'framer-motion';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface AccessibilityActivityProps extends React.HTMLAttributes<HTMLDivElement> {
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
		scale: 1,
		opacity: 1,
		transition: { duration: 0.4 },
	},
	animate: {
		scale: [1, 1.2, 1],
		opacity: [1, 0.8, 1],
		transition: {
			duration: 0.6,
			times: [0, 0.5, 1],
			ease: 'easeInOut'
		},
	},
};

const pathVariants = {
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
			ease: 'linear',
			opacity: { duration: 0.1 },
		},
	},
};

export function AccessibilityActivity({
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
}: AccessibilityActivityProps) {
	const controls = useAnimation();
	const loopRef = useRef(loopOnHover);

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

	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		if (hoverable) triggerAnimation();
		onMouseEnter?.(e);
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		if (hoverable) controls.start('normal');
		onMouseLeave?.(e);
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (animateOnClick) triggerAnimation();
		onClick?.(e);
	};

	return (
		<div
			className={cn('rounded-md', className)}
			style={{
				width: size,
				height: size,
				display: 'inline-block',
				...style,
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			{...props}
		>
			<svg
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
				<motion.circle
					cx="16"
					cy="4"
					r="1"
					variants={circleVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					d="m18 19 1-7-6 1"
					variants={pathVariants}
					animate={controls}
					initial="normal"
					style={{ strokeDasharray: 1 }}
				/>
				<motion.path
					d="m5 8 3-3 5.5 3-2.36 3.5"
					variants={pathVariants}
					animate={controls}
					initial="normal"
					style={{ strokeDasharray: 1 }}
				/>
				<motion.path
					d="M4.24 14.5a5 5 0 0 0 6.88 6"
					variants={pathVariants}
					animate={controls}
					initial="normal"
					style={{ strokeDasharray: 1 }}
				/>
				<motion.path
					d="M13.76 17.5a5 5 0 0 0-6.88-6"
					variants={pathVariants}
					animate={controls}
					initial="normal"
					style={{ strokeDasharray: 1 }}
				/>
			</svg>
		</div>
	);
}