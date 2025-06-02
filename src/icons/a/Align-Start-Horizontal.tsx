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

interface AlignStartHorizontalHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlignStartHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants = {
	normal: (i: number) => ({
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.4,
			delay: i * 0.3,
		},
	}),
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			delay: i * 0.3,
		},
	}),
};

const rectVariants = {
	normal: (i: number) => ({
		scaleY: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: i * 0.3 + 0.3,
		},
	}),
	animate: (i: number) => ({
		scaleY: [0, 1],
		opacity: [0, 1],
		originY: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
			delay: i * 0.4 + 0.1,
		},
	}),
};

export const AlignStartHorizontal = forwardRef<
	AlignStartHorizontalHandle,
	AlignStartHorizontalProps
>(
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
			await controls.start((i) =>
				i < 1 ? pathVariants.animate(i) : rectVariants.animate(i - 1)
			);
			await controls.start((i) =>
				i < 1 ? pathVariants.normal(i) : rectVariants.normal(i - 1)
			);
			if (loopRef.current) triggerAnimation();
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(
			ref,
			() => {
				isControlledRef.current = true;
				return {
					startAnimation: () =>
						controls.start((i) =>
							i < 1 ? pathVariants.animate(i) : rectVariants.animate(i - 1)
						),
					stopAnimation: () =>
						controls.start((i) =>
							i < 1 ? pathVariants.normal(i) : rectVariants.normal(i - 1)
						),
				};
			},
			[controls]
		);

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable)
				controls.start((i) =>
					i < 1 ? pathVariants.normal(i) : rectVariants.normal(i - 1)
				);
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
					{/* Line first */}
					<motion.path
						d="M22 2H2"
						variants={pathVariants}
						custom={0}
						animate={controls}
						initial="normal"
					/>
					{/* Rects second */}
					<motion.rect
						width="6"
						height="16"
						x="4"
						y="6"
						rx="2"
						variants={rectVariants}
						custom={0}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="6"
						height="9"
						x="14"
						y="6"
						rx="2"
						variants={rectVariants}
						custom={1}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

AlignStartHorizontal.displayName = 'AlignStartHorizontal';
