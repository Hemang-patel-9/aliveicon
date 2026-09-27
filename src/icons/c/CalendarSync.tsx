'use client';

import { motion, useAnimation } from 'framer-motion';
import {
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

interface CalendarSyncHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CalendarSyncProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const rotateVariants = {
	normal: { rotate: 0, transition: { duration: 0.3 } },
	animate: {
		rotate: [0, 15, -15, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

export const CalendarSync = forwardRef<CalendarSyncHandle, CalendarSyncProps>(
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
		const rotateControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([
				controls.start('animate'),
				rotateControls.start('animate'),
			]);
			await Promise.all([
				controls.start('normal'),
				rotateControls.start('normal'),
			]);
			if (loopRef.current) triggerAnimation();
		}, [controls, rotateControls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => {
					controls.start('animate');
					rotateControls.start('animate');
				},
				stopAnimation: () => {
					controls.start('normal');
					rotateControls.start('normal');
				},
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				controls.start('normal');
				rotateControls.start('normal');
			}
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
					<motion.path d="M16 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M3 10h4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 2v4" variants={pathVariants} initial="normal" animate={controls} />

					<motion.g variants={rotateVariants} initial="normal" animate={rotateControls}>
						<motion.path d="M11 10v4h4" variants={pathVariants} />
						<motion.path d="m11 14 1.535-1.605a5 5 0 0 1 8 1.5" variants={pathVariants} />
						<motion.path d="m21 18-1.535 1.605a5 5 0 0 1-8-1.5" variants={pathVariants} />
						<motion.path d="M21 22v-4h-4" variants={pathVariants} />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CalendarSync.displayName = 'CalendarSync';
