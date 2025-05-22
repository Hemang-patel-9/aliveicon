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

interface ArrowDownZAHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowDownZAProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const arrowVariants = {
	normal: { y: 0 },
	animate: {
		y: [0, 3, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const aVariants = {
	initial: { y: 0 },
	animate: {
		y: [10, 0, 10],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const zVariants = {
	initial: { y: 0 },
	animate: {
		y: [-10, 0, -10],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const ArrowDownZA = forwardRef<ArrowDownZAHandle, ArrowDownZAProps>(
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
			await controls.start('animate');
			if (loopRef.current) triggerAnimation();
		}, [controls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.stop(),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.stop();
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
					{/* Arrow */}
					<motion.path
						d="m3 16 4 4 4-4"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 20V4" />

					{/* A */}
					<motion.text
						x="15"
						y="10"
						fontSize="6"
						variants={aVariants}
						initial="initial"
						animate={controls}
					>
						A
					</motion.text>

					{/* Z */}
					<motion.text
						x="15"
						y="20"
						fontSize="6"
						variants={zVariants}
						initial="initial"
						animate={controls}
					>
						Z
					</motion.text>
				</svg>
			</div>
		);
	}
);

ArrowDownZA.displayName = 'ArrowDownZA';
