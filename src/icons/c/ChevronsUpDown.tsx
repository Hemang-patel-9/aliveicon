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

interface ChevronsUpDownHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronsUpDownProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const ChevronsUpDown = forwardRef<
	ChevronsUpDownHandle,
	ChevronsUpDownProps
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
		const topControl = useAnimation();
		const bottomControl = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([
				topControl.start('animate'),
				bottomControl.start('animate'),
			]);
			await Promise.all([
				topControl.start('initial'),
				bottomControl.start('initial'),
			]);
			if (loopRef.current) triggerAnimation();
		}, [topControl, bottomControl]);

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
						topControl.start('animate'),
						bottomControl.start('animate'),
					]),
				stopAnimation: () =>
					Promise.all([
						topControl.start('initial'),
						bottomControl.start('initial'),
					]),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				topControl.start('initial');
				bottomControl.start('initial');
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		const topVariant = {
			initial: { y: 0 },
			animate: {
				y: [-2, 0],
				transition: {
					duration: 0.5,
					ease: [0.65, 0, 0.35, 1],
				},
			},
		};

		const bottomVariant = {
			initial: { y: 0 },
			animate: {
				y: [2, 0],
				transition: {
					duration: 0.5,
					ease: [0.65, 0, 0.35, 1],
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
						d="m7 15 5 5 5-5"
						variants={bottomVariant}
						initial="initial"
						animate={bottomControl}
					/>
					<motion.path
						d="m7 9 5-5 5 5"
						variants={topVariant}
						initial="initial"
						animate={topControl}
					/>
				</svg>
			</div>
		);
	}
);

ChevronsUpDown.displayName = 'ChevronsUpDown';
