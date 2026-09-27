'use client';

import { motion, useAnimation, type Variants } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/cn';

interface BadgeAlertHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BadgeAlertProps extends Omit<HTMLMotionProps<'div'>, 'onDrag'> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants: Variants = {
	normal: (delay = 0) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: { duration: 0.3, ease: 'easeInOut', delay },
	}),
	animate: (delay = 0) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: { duration: 0.6, ease: 'easeInOut', delay },
	}),
};

const tiltVariants: Variants = {
	initial: { rotate: 0 },
	animate: {
		rotate: [-3, 3, -2, 2, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const BadgeAlert = forwardRef<BadgeAlertHandle, BadgeAlertProps>(
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
		const tiltControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => {
					controls.start('animate');
					tiltControls.start('animate');
				},
				stopAnimation: () => {
					controls.start('normal');
					tiltControls.start('initial');
				},
			};
		});

		const triggerAnimation = useCallback(async () => {
			await Promise.all([controls.start('animate'), tiltControls.start('animate')]);
			await controls.start('normal');
			await tiltControls.start('initial');

			if (loopRef.current) triggerAnimation();
		}, [controls, tiltControls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) {
				triggerAnimation();
			}
		}, [autoAnimateOnLoad, triggerAnimation]);

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				loopRef.current = loopOnHover;
				if (hoverable && !isControlledRef.current) {
					triggerAnimation();
				}
				onMouseEnter?.(e);
			},
			[hoverable, onMouseEnter, triggerAnimation, loopOnHover]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				loopRef.current = false;
				if (hoverable && !isControlledRef.current) {
					controls.start('normal');
					tiltControls.start('initial');
				}
				onMouseLeave?.(e);
			},
			[hoverable, onMouseLeave, controls, tiltControls]
		);

		const handleClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (animateOnClick && !isControlledRef.current) {
					triggerAnimation();
				}
				onClick?.(e);
			},
			[animateOnClick, onClick, triggerAnimation]
		);

		return (
			<motion.div
				variants={tiltVariants}
				initial="initial"
				animate={tiltControls}
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
					aria-hidden="true"
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
					<motion.path
						d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.line
						x1="12"
						y1="8"
						x2="12"
						y2="12"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.15}
					/>
					<motion.line
						x1="12"
						y1="16"
						x2="12.01"
						y2="16"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.25}
					/>
				</svg>
			</motion.div>
		);
	}
);

BadgeAlert.displayName = 'BadgeAlert';
export { BadgeAlert };
