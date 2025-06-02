'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
	return twMerge(clsx(inputs));
}

interface BaselineHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BaselineProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Baseline = forwardRef<BaselineHandle, BaselineProps>(
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

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		});

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			await controls.start('normal');
			if (loopRef.current) triggerAnimation();
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) {
				triggerAnimation();
			}
		}, [autoAnimateOnLoad, triggerAnimation]);

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (hoverable && !isControlledRef.current) {
					triggerAnimation();
				}
				onMouseEnter?.(e);
			},
			[hoverable, onMouseEnter, triggerAnimation]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (hoverable && !isControlledRef.current) {
					controls.start('normal');
				}
				onMouseLeave?.(e);
			},
			[hoverable, onMouseLeave, controls]
		);

		const handleClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (animateOnClick && !isControlledRef.current) {
					triggerAnimation();
				}
				onClick?.(e);
			},
			[animateOnClick, onClick, triggerAnimation]
		);

		return (
			<div
				className={cn(className)}
				style={{
					width: size,
					height: size,
					display: 'inline-block',
					...style,
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M4 20h16"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m6 16 6-12 6 12"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 12h8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Baseline.displayName = 'Baseline';

export { Baseline };
