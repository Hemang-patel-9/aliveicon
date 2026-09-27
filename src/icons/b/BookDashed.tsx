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

interface BookDashedHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BookDashedProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.4 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
};

export const BookDashed = forwardRef<BookDashedHandle, BookDashedProps>(
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
			await controls.start('normal');
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
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('normal');
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
					<motion.path d="M12 17h1.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 22h1.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 2h1.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M17.5 22H19a1 1 0 0 0 1-1" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M17.5 2H19a1 1 0 0 1 1 1v1.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M20 14v3h-2.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M20 8.5V10" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M4 10V8.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M4 19.5V14" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M8 22H6.5a1 1 0 0 1 0-5H8" variants={pathVariants} animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

BookDashed.displayName = 'BookDashed';
