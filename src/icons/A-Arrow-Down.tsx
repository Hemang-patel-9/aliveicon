'use client';
import { useAnimation, motion } from 'framer-motion';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface ArrowDownIconProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

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
			ease: 'easeInOut',
			opacity: { duration: 0.1 },
		},
	},
};

export function ArrowDownIcon({
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
}: ArrowDownIconProps) {
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
			className={cn('inline-block', className)}
			style={{
				width: size,
				height: size,
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
				<motion.path d="M3.5 13h6" variants={pathVariants} animate={controls} initial="normal" />
				<motion.path d="m2 16 4.5-9 4.5 9" variants={pathVariants} animate={controls} initial="normal" />
				<motion.path d="M18 7v9" variants={pathVariants} animate={controls} initial="normal" />
				<motion.path d="m14 12 4 4 4-4" variants={pathVariants} animate={controls} initial="normal" />
			</svg>
		</div>
	);
}
