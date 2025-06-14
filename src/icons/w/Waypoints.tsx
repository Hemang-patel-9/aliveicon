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

interface WaypointsHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WaypointsProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const lineVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			delay: i * 0.1,
			ease: 'easeInOut',
		},
	}),
};

const circleVariants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			delay: i * 0.1 + 0.05,
			ease: 'easeOut',
		},
	}),
};

export const Waypoints = forwardRef<WaypointsHandle, WaypointsProps>(
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
			await controls.start(i =>
				i < 4
					? lineVariants.animate(i)
					: circleVariants.animate(i - 4)
			);
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
				startAnimation: () =>
					controls.start(i =>
						i < 4
							? lineVariants.animate(i)
							: circleVariants.animate(i - 4)
					),
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('normal');
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		// SVG path data and circles
		const paths = [
			{ d: 'm10.2 6.3-3.9 3.9' },
			{ d: 'M7 12h10' },
			{ d: 'm13.8 17.7 3.9-3.9' },
		];

		const circles = [
			{ cx: 12, cy: 4.5 },
			{ cx: 4.5, cy: 12 },
			{ cx: 19.5, cy: 12 },
			{ cx: 12, cy: 19.5 },
		];

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
					{paths.map((p, i) => (
						<motion.path
							key={`path-${i}`}
							d={p.d}
							initial="normal"
							variants={lineVariants}
							animate={controls}
							custom={i}
						/>
					))}
					{circles.map((c, i) => (
						<motion.circle
							key={`circle-${i}`}
							cx={c.cx}
							cy={c.cy}
							r={2.5}
							initial="normal"
							variants={circleVariants}
							animate={controls}
							custom={i}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Waypoints.displayName = 'Waypoints';
