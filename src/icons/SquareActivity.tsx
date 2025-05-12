'use client';
import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useEffect,
} from 'react';
import { cn } from '../lib/utils';

export interface ActivityHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ActivityIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'linear',
			opacity: { duration: 0.1 },
		},
	},
};

const squareVariants: Variants = {
	normal: {
		transition: { duration: 0.4 },
	},
	animate: {
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const SquareActivity = forwardRef<ActivityHandle, ActivityIconProps>(
	(
		{
			onMouseEnter,
			onMouseLeave,
			onClick,
			className,
			style,
			size = 28,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
			...props
		},
		ref
	) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);
		const loopOnHoverRef = useRef(loopOnHover);

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			await controls.start('normal');
			if (loopOnHoverRef.current) {
				triggerAnimation(); // recursion
			}
		}, [controls]);

		useEffect(() => {
			loopOnHoverRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) {
				triggerAnimation();
			}
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: triggerAnimation,
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && hoverable) {
					triggerAnimation();
				}
				onMouseEnter?.(e);
			},
			[triggerAnimation, onMouseEnter, hoverable]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && hoverable) {
					controls.start('normal');
				}
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave, hoverable]
		);

		const handleClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current && animateOnClick) {
					triggerAnimation();
				}
				onClick?.(e);
			},
			[triggerAnimation, onClick, animateOnClick]
		);

		return (
			<div
				className={cn("rounded-md", className)}
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
					<motion.rect
						width="18"
						height="18"
						x="3"
						y="3"
						rx="2"
						variants={squareVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						variants={pathVariants}
						animate={controls}
						initial="normal"
						d="M17 12h-2l-2 5-2-10-2 5H7"
					/>
				</svg>
			</div>
		);
	}
);

SquareActivity.displayName = 'SquareActivity';

export { SquareActivity };
