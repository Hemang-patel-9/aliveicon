'use client';

import { useAnimation, motion } from 'framer-motion';
import * as React from 'react';
import { useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface AudioLinesHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AudioLinesProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const variants = {
	normal: (d: string) => ({
		d,
		transition: { duration: 0.3 },
	}),
	animate: (dFrames: string[], duration: number) => ({
		d: dFrames,
		transition: {
			duration,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	}),
};

const AudioLines = forwardRef<AudioLinesHandle, AudioLinesProps>(
	(
		{
			size = 28,
			className,
			style,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = true,
			animateOnClick = false,
			onMouseEnter,
			onMouseLeave,
			onClick,
			...props
		},
		ref
	) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);
		const loopRef = useRef(loopOnHover);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		});

		// Update loop ref when prop changes
		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		// Recursive animation loop helper
		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			await controls.start('normal');
			if (loopRef.current) {
				triggerAnimation();
			}
		}, [controls]);

		// Auto animate on load
		useEffect(() => {
			if (autoAnimateOnLoad && !isControlledRef.current) {
				triggerAnimation();
			}
		}, [autoAnimateOnLoad, triggerAnimation]);

		// Hover handlers
		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				triggerAnimation();
			}
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				controls.start('normal');
			}
			onMouseLeave?.(e);
		};

		// Click handler
		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && animateOnClick) {
				triggerAnimation();
			}
			onClick?.(e);
		};

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
					<path d="M2 10v3" />
					<motion.path
						custom={['M6 6v11', 'M6 10v3', 'M6 6v11']}
						variants={{
							normal: variants.normal('M6 6v11'),
							animate: variants.animate(['M6 6v11', 'M6 10v3', 'M6 6v11'], 1.5),
						}}
						initial="normal"
						animate={controls}
						d="M6 6v11"
					/>
					<motion.path
						custom={['M10 3v18', 'M10 9v5', 'M10 3v18']}
						variants={{
							normal: variants.normal('M10 3v18'),
							animate: variants.animate(['M10 3v18', 'M10 9v5', 'M10 3v18'], 1),
						}}
						initial="normal"
						animate={controls}
						d="M10 3v18"
					/>
					<motion.path
						custom={['M14 8v7', 'M14 6v11', 'M14 8v7']}
						variants={{
							normal: variants.normal('M14 8v7'),
							animate: variants.animate(['M14 8v7', 'M14 6v11', 'M14 8v7'], 0.8),
						}}
						initial="normal"
						animate={controls}
						d="M14 8v7"
					/>
					<motion.path
						custom={['M18 5v13', 'M18 7v9', 'M18 5v13']}
						variants={{
							normal: variants.normal('M18 5v13'),
							animate: variants.animate(['M18 5v13', 'M18 7v9', 'M18 5v13'], 1.5),
						}}
						initial="normal"
						animate={controls}
						d="M18 5v13"
					/>
					<path d="M22 10v3" />
				</svg>
			</div>
		);
	}
);

AudioLines.displayName = 'AudioLines';

export { AudioLines };
