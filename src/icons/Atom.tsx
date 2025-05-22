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

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface AtomHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AtomProps extends HTMLAttributes<HTMLDivElement> {
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
			duration: 0.7,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
};

const Atom = forwardRef<AtomHandle, AtomProps>(
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

		// Expose start/stop animation methods externally
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
			} else if (!hoverable) {
				controls.start('normal');
			}
		}, [autoAnimateOnLoad, hoverable, controls, triggerAnimation]);

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
					<motion.circle
						cx="12"
						cy="12"
						r="1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.3}
					/>
					<motion.path
						d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
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

Atom.displayName = 'Atom';

export { Atom };
