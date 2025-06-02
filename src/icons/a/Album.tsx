'use client';

import { useAnimation, motion } from 'framer-motion';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const squareVariants = {
	normal: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.4 },
	},
	animate: {
		scale: 1.10,
		opacity: 0.9,
		transition: { duration: 0.6, ease: 'easeInOut' },
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

export const Album = ({
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
}: AlbumProps) => {
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
				<motion.rect
					width="18"
					height="18"
					x="3"
					y="3"
					rx="2"
					ry="2"
					variants={squareVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.polyline
					points="11 3 11 11 14 8 17 11 17 3"
					variants={pathVariants}
					animate={controls}
					initial="normal"
					style={{ strokeDasharray: 1 }}
				/>
			</svg>
		</div>
	);
}
