'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface AnnoyedHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AnnoyedProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
	delay?: number;
	animationTrigger?: 'manual' | 'hover' | 'click' | 'load';
}

const DURATION = 0.7;

const faceVariants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 1.1, 0.95, 1.1, 1],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const mouthVariants = {
	normal: { x: 0 },
	animate: {
		x: [-1, 1, -0.5, 0],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const leftEyeVariants = {
	normal: { y: 0 },
	animate: {
		y: [-1, -3, -1],
		transition: { duration: DURATION, ease: 'easeOut' },
	},
};

const rightEyeVariants = {
	normal: { y: 0 },
	animate: {
		y: [-1, -2, -1],
		transition: { duration: DURATION, ease: 'easeOut' },
	},
};

export const Annoyed = forwardRef<AnnoyedHandle, AnnoyedProps>(
	(
		{
			size = 28,
			className,
			style,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
			animationTrigger = 'hover',
			delay = 0,
			onMouseEnter,
			onMouseLeave,
			onClick,
			...props
		},
		ref
	) => {
		const controls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			if (!loopRef.current) {
				await controls.start('normal');
			} else {
				triggerAnimation();
			}
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad || animationTrigger === 'load') {
				timeoutRef.current = setTimeout(() => {
					triggerAnimation();
				}, delay);
			}
			return () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}, [autoAnimateOnLoad, animationTrigger, delay, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable && animationTrigger === 'hover') {
				triggerAnimation();
			}
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
			if (!isControlledRef.current && hoverable && animationTrigger === 'hover' && !loopOnHover) {
				controls.start('normal');
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if ((!isControlledRef.current && animateOnClick) || animationTrigger === 'click') {
				triggerAnimation();
			}
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
				<motion.svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
				>
					<motion.circle cx="12" cy="12" r="10" variants={faceVariants} />
					<motion.path d="M8 15h8" variants={mouthVariants} />
					<motion.path d="M8 9h2" variants={leftEyeVariants} />
					<motion.path d="M14 9h2" variants={rightEyeVariants} />
				</motion.svg>
			</div>
		);
	}
);

Annoyed.displayName = 'Annoyed';
