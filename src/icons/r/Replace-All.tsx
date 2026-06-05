'use client';

import { motion, useAnimation } from 'framer-motion';
import React, {
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

interface ReplaceAllHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ReplaceAllProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const ReplaceAll = forwardRef<ReplaceAllHandle, ReplaceAllProps>(
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

		const animate = useCallback(async () => {
			await controls.start((i) => {
				const transition = {
					duration: 0.6,
					ease: 'easeInOut',
					delay: i * 0.05,
				};

				if (i <= 5) {
					// Dots
					return { opacity: [0, 1], scale: [0.6, 1], transition };
				}
				if (i === 6) {
					// Arrow
					return { pathLength: [0, 1], opacity: [0, 1], transition };
				}
				if (i === 7) {
					// Vertical stroke
					return { y: [-10, 0], opacity: [0, 1], transition };
				}
				// Rectangle
				return { scale: [0.8, 1], opacity: [0, 1], transition };
			});
			await controls.start('visible');
			if (loopRef.current) animate();
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) animate();
		}, [autoAnimateOnLoad, animate]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: animate,
				stopAnimation: () => controls.start('visible'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) animate();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable)
				controls.start('visible');
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const elements = [
			<motion.path key="p1" d="M14 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" />,
			<motion.path key="p2" d="M14 4a2 2 0 0 1 2-2" />,
			<motion.path key="p3" d="M16 10a2 2 0 0 1-2-2" />,
			<motion.path key="p4" d="M20 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" />,
			<motion.path key="p5" d="M20 2a2 2 0 0 1 2 2" />,
			<motion.path key="p6" d="M22 8a2 2 0 0 1-2 2" />,
			<motion.path key="arrow" d="m3 7 3 3 3-3" />,
			<motion.path key="line" d="M6 10V5a3 3 0 0 1 3-3h1" />,
			<motion.rect key="rect" x="2" y="14" width="8" height="8" rx="2" />,
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{elements.map((el, i) =>
						React.cloneElement(el, {
							initial: 'visible',
							animate: controls,
							custom: i,
							variants: {
								visible: { opacity: 1, scale: 1, y: 0, pathLength: 1 },
							},
						})
					)}
				</svg>
			</div>
		);
	}
);

ReplaceAll.displayName = 'ReplaceAll';
export { ReplaceAll };
