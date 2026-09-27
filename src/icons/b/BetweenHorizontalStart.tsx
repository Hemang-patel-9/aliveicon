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

interface BetweenHorizontalStartHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BetweenHorizontalStartProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const BetweenHorizontalStart = forwardRef<
	BetweenHorizontalStartHandle,
	BetweenHorizontalStartProps
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
		const hoverActive = useRef(false);

		const playAnimation = useCallback(() => {
			return controls.start('animate').then(() => controls.start('normal'));
		}, [controls]);

		const loopAnimation = useCallback(async () => {
			while (hoverActive.current) {
				await controls.start('animate');
				await controls.start('normal');
			}
		}, [controls]);

		useEffect(() => {
			if (autoAnimateOnLoad) playAnimation();
		}, [autoAnimateOnLoad, playAnimation]);

		useImperativeHandle(ref, () => ({
			startAnimation: () => controls.start('animate'),
			stopAnimation: () => controls.start('normal'),
		}));

		function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
			onMouseEnter?.(e);
			if (!hoverable) return;

			hoverActive.current = true;
			if (loopOnHover) loopAnimation();
			else playAnimation();
		}

		function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
			onMouseLeave?.(e);
			if (!hoverable) return;

			hoverActive.current = false;
			controls.start('normal');
		}

		function handleClick(e: React.MouseEvent<HTMLDivElement>) {
			onClick?.(e);
			if (animateOnClick) playAnimation();
		}

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
				x: [0, 5, 0, -5, 0],
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
						d={rectPath(8, 3, 13, 7, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 9 3 3-3 3"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d={rectPath(8, 14, 13, 7, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BetweenHorizontalStart.displayName = 'BetweenHorizontalStart';
