"use client";

import { motion, useAnimation } from "framer-motion";
import * as React from "react";
import { useCallback, useImperativeHandle, useRef } from "react";
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
interface AlignCenterHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlignCenterProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const pathMotion = {
	normal: {
		translateX: 0,
	},
	animate: {
		translateX: [0, 3, -3, 2, -2, 0],
		transition: {
			ease: "linear",
			duration: 1,
		},
	},
};

export const AlignCenter = React.forwardRef<AlignCenterHandle, AlignCenterProps>(
	(
		{
			size = 28,
			className,
			style,
			onMouseEnter,
			onMouseLeave,
			onClick,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
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
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const triggerAnimation = useCallback(async () => {
			await controls.start("animate");
			await controls.start("normal");
			if (loopRef.current) triggerAnimation();
		}, [controls]);

		React.useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		React.useEffect(() => {
			if (autoAnimateOnLoad && !isControlledRef.current) {
				triggerAnimation();
			}
		}, [autoAnimateOnLoad, triggerAnimation]);

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && hoverable) {
					triggerAnimation();
				}
				onMouseEnter?.(e);
			},
			[triggerAnimation, onMouseEnter, hoverable]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && hoverable) {
					controls.start("normal");
				}
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave, hoverable]
		);

		const handleClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && animateOnClick) {
					triggerAnimation();
				}
				onClick?.(e);
			},
			[triggerAnimation, onClick, animateOnClick]
		);

		return (
			<div
				className={cn("inline-block", className)}
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
						d="M17 12H7"
						variants={pathMotion}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M19 18H5" animate={controls} initial="normal" />
					<motion.path d="M21 6H3" animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

AlignCenter.displayName = "AlignCenter";