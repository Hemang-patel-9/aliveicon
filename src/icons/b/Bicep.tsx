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

interface BicepHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BicepProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const Bicep = forwardRef<BicepHandle, BicepProps>(
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

		const triggerAnimation = useCallback(async () => {
			await controls.start('flex');
			await controls.start('relax');
			if (loopRef.current) triggerAnimation();
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => ({
			startAnimation: () => controls.start('flex'),
			stopAnimation: () => controls.start('relax'),
		}));

		const pathVariants = {
			relax: { pathLength: 1, opacity: 1, rotate: 0 },
			flex: {
				pathLength: [1, 1.2, 1],
				opacity: [1, 1],
				rotate: [0, -2, 2, -1, 0],
				transition: { duration: 1.2, ease: 'easeInOut' },
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
						d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"
						variants={pathVariants}
						initial="relax"
						animate={controls}
					/>
					<motion.path
						d="M15 14a5 5 0 0 0-7.584 2"
						variants={pathVariants}
						initial="relax"
						animate={controls}
					/>
					<motion.path
						d="M9.964 6.825C8.019 7.977 9.5 13 8 15"
						variants={pathVariants}
						initial="relax"
						animate={controls}
					/>
				</svg>
			</div>
		);

		function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
			if (hoverable) triggerAnimation();
			onMouseEnter?.(e);
		}

		function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
			if (hoverable) controls.start('relax');
			onMouseLeave?.(e);
		}

		function handleClick(e: React.MouseEvent<HTMLDivElement>) {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		}
	}
);

Bicep.displayName = 'Bicep';
