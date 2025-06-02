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

interface BetweenVerticalStartHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BetweenVerticalStartProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const rectPath = (x: number, y: number, width: number, height: number, rx: number) =>
	`M${x + rx},${y} ` +
	`h${width - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 ${rx},${rx} ` +
	`v${height - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 -${rx},${rx} ` +
	`h-${width - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 -${rx},-${rx} ` +
	`v-${height - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 ${rx},-${rx} ` +
	'z';

export const BetweenVerticalStart = forwardRef<
	BetweenVerticalStartHandle,
	BetweenVerticalStartProps
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
		const loopRef = useRef(false);

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

		useImperativeHandle(ref, () => ({
			startAnimation: () => controls.start('animate'),
			stopAnimation: () => controls.start('normal'),
		}));

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: { duration: 1.2, ease: 'easeInOut' },
			},
		};

		const arrowVariants = {
			normal: { y: 0, opacity: 1 },
			animate: {
				y: [0, 5, 0, -5, 0],
				opacity: [1, 0.7, 1, 0.7, 1],
				transition: { duration: 2, ease: 'easeInOut' },
			},
		};

		function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
			if (hoverable) {
				loopRef.current ? triggerAnimation() : controls.start('animate');
			}
			onMouseEnter?.(e);
		}

		function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
			if (hoverable) {
				loopRef.current = false;
				controls.start('normal');
			}
			onMouseLeave?.(e);
		}

		function handleClick(e: React.MouseEvent<HTMLDivElement>) {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		}

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
						d={rectPath(3, 3, 7, 13, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m15 2-3 3-3-3"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d={rectPath(14, 3, 7, 13, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BetweenVerticalStart.displayName = 'BetweenVerticalStart';
