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

interface CircleDashedHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleDashedProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const CircleDashed = forwardRef<CircleDashedHandle, CircleDashedProps>(
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

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			await controls.start('initial');
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
				stopAnimation: () => controls.start('initial'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('initial');
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		const motionVariants = {
			initial: { rotate: 0 },
			animate: {
				rotate: [0, 15, -15, 0],
				transition: {
					duration: 0.8,
					ease: 'easeInOut',
				},
			},
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
				<svg
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
					<motion.path d="M10.1 2.182a10 10 0 0 1 3.8 0" variants={motionVariants} initial="initial" animate={controls} />
					<motion.path d="M13.9 21.818a10 10 0 0 1-3.8 0" variants={motionVariants} initial="initial" animate={controls} />
					<motion.path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" variants={motionVariants} initial="initial" animate={controls} />
					<motion.path d="M2.182 13.9a10 10 0 0 1 0-3.8" variants={motionVariants} initial="initial" animate={controls} />
					<motion.path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" variants={motionVariants} initial="initial" animate={controls} />
					<motion.path d="M21.818 10.1a10 10 0 0 1 0 3.8" variants={motionVariants} initial="initial" animate={controls} />
					<motion.path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" variants={motionVariants} initial="initial" animate={controls} />
					<motion.path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" variants={motionVariants} initial="initial" animate={controls} />
				</svg>
			</div>
		);
	}
);

CircleDashed.displayName = 'CircleDashed';
