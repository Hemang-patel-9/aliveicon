'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface AxeHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AxeProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
};

const Axe = forwardRef<AxeHandle, AxeProps>(
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
		const swingControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => {
					controls.start('animate');
					swingControls.start('swing');
				},
				stopAnimation: () => {
					controls.start('normal');
					swingControls.start('rest');
				},
			};
		});

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			swingControls.start('swing');
			await controls.start('normal');
			swingControls.start('rest');
			if (loopRef.current) triggerAnimation();
		}, [controls, swingControls]);

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
					swingControls.start('rest');
				}
				onMouseLeave?.(e);
			},
			[hoverable, onMouseLeave, controls, swingControls]
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
			<div
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
				<motion.svg
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
					animate={swingControls}
					initial="rest"
					style={{ originX: '50%', originY: '50%' }}
				>
					<motion.path
						d="m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.3}
					/>
				</motion.svg>
			</div>
		);
	}
);

Axe.displayName = 'Axe';

export { Axe };
