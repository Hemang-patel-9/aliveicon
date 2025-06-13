'use client';

import { motion, useAnimation } from 'framer-motion';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | false | null | undefined)[]) {
	return twMerge(clsx(inputs));
}

interface BugOffHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BugOffProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const BugOff = forwardRef<BugOffHandle, BugOffProps>(
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

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.5,
					ease: 'easeInOut',
					staggerChildren: 0.05,
				},
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
					<motion.path d="M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M14.12 3.88 16 2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M22 13h-4v-2a4 4 0 0 0-4-4h-1.3" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="m2 2 20 20" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 20v-8" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M6 13H2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M3 21c0-2.1 1.7-3.9 3.8-4" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

BugOff.displayName = 'BugOff';
export { BugOff };
