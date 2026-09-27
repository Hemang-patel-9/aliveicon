'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface CalendarSearchHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CalendarSearchProps extends React.HTMLAttributes<HTMLDivElement> {
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
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

const scaleVariants = {
	normal: { scale: 1, transition: { duration: 0.3 } },
	animate: {
		scale: [1, 1.15, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const CalendarSearch = forwardRef<CalendarSearchHandle, CalendarSearchProps>(
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
		const magnifierControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([controls.start('animate'), magnifierControls.start('animate')]);
			await Promise.all([controls.start('normal'), magnifierControls.start('normal')]);
			if (loopRef.current) triggerAnimation();
		}, [controls, magnifierControls]);

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
					magnifierControls.start('animate');
				},
				stopAnimation: () => {
					controls.start('normal');
					magnifierControls.start('normal');
				},
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
			if (!isControlledRef.current && hoverable) {
				controls.start('normal');
				magnifierControls.start('normal');
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
					aria-hidden="true"
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
					<motion.path
						d="M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 22-1.875-1.875"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M3 10h18" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.circle
						cx="18"
						cy="18"
						r="3"
						variants={scaleVariants}
						initial="normal"
						animate={magnifierControls}
					/>
				</svg>
			</div>
		);
	}
);

CalendarSearch.displayName = 'CalendarSearch';
