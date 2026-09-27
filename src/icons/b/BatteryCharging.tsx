'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface BatteryChargingHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BatteryChargingProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const BatteryCharging = forwardRef<BatteryChargingHandle, BatteryChargingProps>(
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
		const boltControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([controls.start('animate'), boltControls.start('pulse')]);
			await Promise.all([controls.start('normal'), boltControls.start('normal')]);
			if (loopRef.current) triggerAnimation();
		}, [controls, boltControls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => triggerAnimation(),
				stopAnimation: () => {
					controls.start('normal');
					boltControls.start('normal');
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
				boltControls.start('normal');
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

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

		const boltVariants = {
			normal: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
			pulse: {
				scale: [1, 1.2, 1],
				opacity: [1, 0.6, 1],
				transition: {
					duration: 0.8,
					repeat: Infinity,
					ease: 'easeInOut',
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
					<motion.path
						d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="m11 7-3 5h4l-3 5"
						variants={boltVariants}
						animate={boltControls}
						initial="normal"
					/>
					<motion.line
						x1="22"
						y1="11"
						x2="22"
						y2="13"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

BatteryCharging.displayName = 'BatteryCharging';
