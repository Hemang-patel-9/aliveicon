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

interface BetweenHorizontalEndHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BetweenHorizontalEndProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const rectPath = (x: number, y: number, width: number, height: number, rx: number) =>
	// Rectangle path with rounded corners
	`M${x + rx},${y} ` + // start top-left corner
	`h${width - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 ${rx},${rx} ` +
	`v${height - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 -${rx},${rx} ` +
	`h-${width - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 -${rx},-${rx} ` +
	`v-${height - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 ${rx},-${rx} ` +
	'z';

export const BetweenHorizontalEnd = forwardRef<
	BetweenHorizontalEndHandle,
	BetweenHorizontalEndProps
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
		const controls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

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

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: { duration: 1.2, ease: 'easeInOut' },
			},
		};

		const arrowVariants = {
			normal: { x: 0, opacity: 1 },
			animate: {
				x: [0, -5, 0, 5, 0],
				opacity: [1, 0.7, 1, 0.7, 1],
				transition: { duration: 2, ease: 'easeInOut' },
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
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
				>
					<motion.path
						d={rectPath(3, 3, 13, 7, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 15-3-3 3-3"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d={rectPath(3, 14, 13, 7, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
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

BetweenHorizontalEnd.displayName = 'BetweenHorizontalEnd';
