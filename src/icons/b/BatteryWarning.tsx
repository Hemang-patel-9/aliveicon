'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface BatteryWarningHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BatteryWarningProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const BatteryWarning = forwardRef<BatteryWarningHandle, BatteryWarningProps>(
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
		const outlineControls = useAnimation();
		const warningControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([outlineControls.start('animate'), warningControls.start('animate')]);
			await Promise.all([outlineControls.start('normal'), warningControls.start('normal')]);
			if (loopRef.current) triggerAnimation();
		}, [outlineControls, warningControls]);

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
					outlineControls.start('normal');
					warningControls.start('normal');
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
				outlineControls.start('normal');
				warningControls.start('normal');
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		const outlineVariant = {
			normal: { opacity: 1, pathLength: 1 },
			animate: {
				opacity: [0.5, 1],
				pathLength: [0, 1],
				transition: { duration: 0.5, ease: 'easeInOut' },
			},
		};

		const warningVariant = {
			normal: { opacity: 1, scale: 1 },
			animate: {
				opacity: [0, 1],
				scale: [0.8, 1.1, 1],
				transition: { duration: 0.4, ease: 'easeOut' },
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
						d="M10 17h.01"
						variants={warningVariant}
						initial="normal"
						animate={warningControls}
					/>
					<motion.path
						d="M10 7v6"
						variants={warningVariant}
						initial="normal"
						animate={warningControls}
					/>
					<motion.path
						d="M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"
						variants={outlineVariant}
						initial="normal"
						animate={outlineControls}
					/>
					<motion.path
						d="M22 11v2"
						variants={outlineVariant}
						initial="normal"
						animate={outlineControls}
					/>
					<motion.path
						d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"
						variants={outlineVariant}
						initial="normal"
						animate={outlineControls}
					/>
				</svg>
			</div>
		);
	}
);

BatteryWarning.displayName = 'BatteryWarning';
