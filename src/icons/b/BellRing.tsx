'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface BellRingHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BellRingProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const BellRing = forwardRef<BellRingHandle, BellRingProps>(
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
		const arcsControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const swingVariants = {
			normal: { rotate: 0 },
			animate: {
				rotate: [0, 15, -12, 10, -7, 5, 0],
				transition: { duration: 1, ease: 'easeInOut' },
			},
		};

		const ringVibrateVariants = {
			normal: { x: 0, opacity: 1 },
			animate: {
				x: [-2, 2, -1.5, 1.5, -1, 1, 0],
				opacity: [1, 0.8, 1, 0.9, 1, 0.85, 1],
				transition: { duration: 1, ease: 'easeInOut' },
			},
		};

		const triggerAnimation = useCallback(async () => {
			await Promise.all([controls.start('animate'), arcsControls.start('animate')]);
			await Promise.all([controls.start('normal'), arcsControls.start('normal')]);
			if (loopRef.current) triggerAnimation();
		}, [controls, arcsControls]);

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
					arcsControls.start('animate');
				},
				stopAnimation: () => {
					controls.start('normal');
					arcsControls.start('normal');
				},
			};
		});

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
					<motion.g
						animate={controls}
						initial="normal"
						variants={swingVariants}
						style={{ originX: '50%', originY: '0%' }}
					>
						<path d="M10.268 21a2 2 0 0 0 3.464 0" />
						<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
					</motion.g>

					<motion.path
						d="M4 2C2.8 3.7 2 5.7 2 8"
						animate={arcsControls}
						initial="normal"
						variants={ringVibrateVariants}
					/>

					<motion.path
						d="M22 8c0-2.3-.8-4.3-2-6"
						animate={arcsControls}
						initial="normal"
						variants={ringVibrateVariants}
					/>
				</svg>
			</div>
		);

		function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		}

		function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
			loopRef.current = false;
			if (!isControlledRef.current && hoverable) {
				controls.start('normal');
				arcsControls.start('normal');
			}
			onMouseLeave?.(e);
		}

		function handleClick(e: React.MouseEvent<HTMLDivElement>) {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		}
	}
);

BellRing.displayName = 'BellRing';
