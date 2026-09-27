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

interface ChevronsLeftRightHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronsLeftRightProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const ChevronsLeftRight = forwardRef<
	ChevronsLeftRightHandle,
	ChevronsLeftRightProps
>(
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
		const leftControl = useAnimation();
		const rightControl = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([
				leftControl.start('animate'),
				rightControl.start('animate'),
			]);
			await Promise.all([
				leftControl.start('initial'),
				rightControl.start('initial'),
			]);
			if (loopRef.current) triggerAnimation();
		}, [leftControl, rightControl]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () =>
					Promise.all([
						leftControl.start('animate'),
						rightControl.start('animate'),
					]),
				stopAnimation: () =>
					Promise.all([
						leftControl.start('initial'),
						rightControl.start('initial'),
					]),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				leftControl.start('initial');
				rightControl.start('initial');
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		const leftVariant = {
			initial: { x: 0 },
			animate: {
				x: [0, -2, 0],
				transition: {
					duration: 0.5,
					ease: "easeInOut",
				},
			},
		};

		const rightVariant = {
			initial: { x: 0 },
			animate: {
				x: [0, 2, 0],
				transition: {
					duration: 0.5,
					ease: "easeInOut",
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
					<motion.path
						d="m9 7-5 5 5 5"
						variants={leftVariant}
						initial="initial"
						animate={leftControl}
					/>
					<motion.path
						d="m15 7 5 5-5 5"
						variants={rightVariant}
						initial="initial"
						animate={rightControl}
					/>
				</svg>
			</div>
		);
	}
);

ChevronsLeftRight.displayName = 'ChevronsLeftRight';
