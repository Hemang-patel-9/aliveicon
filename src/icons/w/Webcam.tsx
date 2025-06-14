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

interface WebcamHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WebcamProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const Webcam = forwardRef<WebcamHandle, WebcamProps>(
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
				if (i === 0) {
					// outer circle
					return {
						r: [0, 8],
						opacity: [0, 1],
						transition: { duration: 0.6, ease: 'easeInOut' },
					};
				}
				if (i === 1) {
					// inner circle
					return {
						scale: [0, 1],
						opacity: [0, 1],
						transformOrigin: 'center',
						transition: { duration: 0.6, ease: 'easeOut' },
					};
				}
				if (i === 2 || i === 3) {
					// base and stand
					return {
						pathLength: [0, 1],
						opacity: [0, 1],
						transition: { duration: 0.6, delay: 0.1 * (i - 2), ease: 'easeInOut' },
					};
				}
				return {};
			});
			await controls.start('normal');
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
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) animate();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('normal');
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						cx="12"
						cy="10"
						r="8"
						initial="normal"
						animate={controls}
						custom={0}
						variants={{ normal: { r: 8, opacity: 1 } }}
					/>
					<motion.circle
						cx="12"
						cy="10"
						r="3"
						initial="normal"
						animate={controls}
						custom={1}
						variants={{ normal: { scale: 1, opacity: 1 } }}
					/>
					<motion.path
						d="M7 22h10"
						initial="normal"
						animate={controls}
						custom={2}
						variants={{ normal: { pathLength: 1, opacity: 1 } }}
					/>
					<motion.path
						d="M12 22v-4"
						initial="normal"
						animate={controls}
						custom={3}
						variants={{ normal: { pathLength: 1, opacity: 1 } }}
					/>
				</svg>
			</div>
		);
	}
);

Webcam.displayName = 'Webcam';
export { Webcam };
