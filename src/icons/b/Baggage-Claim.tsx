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

interface BaggageClaimHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BaggageClaimProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
};

const BaggageClaim = forwardRef<BaggageClaimHandle, BaggageClaimProps>(
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
						d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.15}
					/>
					<motion.rect
						width="13"
						height="8"
						x="8"
						y="6"
						rx="1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.3}
					/>
					<motion.circle
						cx="18"
						cy="20"
						r="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.45}
					/>
					<motion.circle
						cx="9"
						cy="20"
						r="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.6}
					/>
				</svg>
			</div>
		);
	}
);

BaggageClaim.displayName = 'BaggageClaim';

export { BaggageClaim };
