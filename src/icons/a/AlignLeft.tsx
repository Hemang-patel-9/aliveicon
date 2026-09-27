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

interface AlignLeftHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlignLeftProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants = {
	normal: (i: number) => ({
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: {
			duration: 0.4,
			delay: i * 0.2,
		},
	}),
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
			delay: i * 0.2,
		},
	}),
};

export const AlignLeft = forwardRef<AlignLeftHandle, AlignLeftProps>(
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
			await controls.start((i) => pathVariants.animate(i));
			await controls.start((i) => pathVariants.normal(i));
			if (loopRef.current) triggerAnimation();
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(
			ref,
			() => {
				isControlledRef.current = true;
				return {
					startAnimation: () => controls.start((i) => pathVariants.animate(i)),
					stopAnimation: () => controls.start((i) => pathVariants.normal(i)),
				};
			},
			[controls]
		);

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable)
				controls.start((i) => pathVariants.normal(i));
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
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
						d="M21 6H3"
						variants={pathVariants}
						custom={0}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M15 12H3"
						variants={pathVariants}
						custom={1}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M17 18H3"
						variants={pathVariants}
						custom={2}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

AlignLeft.displayName = 'AlignLeft';
