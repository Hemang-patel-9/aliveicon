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

interface ChartScatterHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartScatterProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const ChartScatter = forwardRef<ChartScatterHandle, ChartScatterProps>(
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

		const pathVariants = {
			initial: { pathLength: 1 },
			animate: {
				pathLength: [0, 1],
				transition: { duration: 0.4, ease: 'easeInOut' },
			},
		};

		const dotVariants = {
			initial: { scale: 1, opacity: 1 },
			animate: {
				scale: [0, 1.2, 1],
				opacity: [0, 1],
				transition: { duration: 0.4, ease: 'easeOut' },
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
					<motion.circle cx="7.5" cy="7.5" r="0.5" fill="currentColor" variants={dotVariants} initial="initial" animate={controls} />
					<motion.circle cx="18.5" cy="5.5" r="0.5" fill="currentColor" variants={dotVariants} initial="initial" animate={controls} />
					<motion.circle cx="11.5" cy="11.5" r="0.5" fill="currentColor" variants={dotVariants} initial="initial" animate={controls} />
					<motion.circle cx="7.5" cy="16.5" r="0.5" fill="currentColor" variants={dotVariants} initial="initial" animate={controls} />
					<motion.circle cx="17.5" cy="14.5" r="0.5" fill="currentColor" variants={dotVariants} initial="initial" animate={controls} />
					<motion.path d="M3 3v16a2 2 0 0 0 2 2h16" variants={pathVariants} initial="initial" animate={controls} />
				</svg>
			</div>
		);
	}
);

ChartScatter.displayName = 'ChartScatter';
