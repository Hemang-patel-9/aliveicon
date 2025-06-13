'use client';

import { motion, useAnimation } from 'framer-motion';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface BrushHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BrushProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

// Brush body animation (painting motion)
const brushBodyVariants = {
	normal: {
		x: 0,
		y: 0,
		rotate: 0,
		transition: { duration: 0.3 }
	},
	painting: {
		x: [0, -1, 0.5, -0.8, 0.3, 0],
		y: [0, 0.5, -0.3, 0.4, -0.2, 0],
		rotate: [0, -2, 1, -1.5, 0.8, 0],
		transition: {
			duration: 1.2,
			ease: "easeInOut"
		}
	}
};

// Bristles animation (squish and spread)
const bristlesVariants = {
	normal: {
		d: "m11 10 3 3",
		transition: { duration: 0.3 }
	},
	painting: {
		d: ["m11 10 3 3", "m10.5 10.5 3.5 2.5", "m11.2 9.8 2.8 3.2", "m10.8 10.2 3.2 2.8", "m11 10 3 3"],
		transition: {
			duration: 1.2,
			ease: "easeInOut"
		}
	}
};

// Paint blob animation (appears and spreads)
const paintBlobVariants = {
	normal: {
		opacity: 0,
		scale: 0,
		transition: { duration: 0.2 }
	},
	painting: {
		opacity: [0, 0.8, 0.6, 0.4, 0.2, 0],
		scale: [0, 0.8, 1.2, 1.5, 1.8, 2],
		transition: {
			duration: 1.2,
			ease: "easeOut"
		}
	}
};

// Brush tip animation (pressure effect)
const brushTipVariants = {
	normal: {
		d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z",
		transition: { duration: 0.3 }
	},
	painting: {
		d: [
			"M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z",
			"M6.2 20.8A3.2 3.2 0 1 0 2.8 17.2a2.42 2.42 0 0 1-.508 1.592A1 1 0 0 0 2.8 20.8z",
			"M6.8 21.2A3.8 3.8 0 1 0 3.2 17.8a2.82 2.82 0 0 1-.908 1.992A1 1 0 0 0 3.2 21.2z",
			"M6.3 20.9A3.3 3.3 0 1 0 2.9 17.3a2.52 2.52 0 0 1-.608 1.692A1 1 0 0 0 2.9 20.9z",
			"M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z"
		],
		transition: {
			duration: 1.2,
			ease: "easeInOut"
		}
	}
};

// Handle animation (subtle movement)
const handleVariants = {
	normal: {
		d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031",
		transition: { duration: 0.3 }
	},
	painting: {
		d: [
			"M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031",
			"M9.769 17.231 21.178 5.824a1 1 0 0 0-2.802-3.202L6.767 14.231",
			"M10.169 16.831 21.578 5.424a1 1 0 0 0-3.202-2.802L7.167 13.831",
			"M9.869 17.131 21.278 5.724a1 1 0 0 0-2.902-3.102L6.867 14.131",
			"M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"
		],
		transition: {
			duration: 1.2,
			ease: "easeInOut"
		}
	}
};

export const Brush = forwardRef<BrushHandle, BrushProps>(
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
			// Start painting animation
			await controls.start('painting');
			// Hold briefly
			await new Promise(resolve => setTimeout(resolve, 200));
			// Return to normal
			await controls.start('normal');

			if (loopRef.current) {
				setTimeout(() => triggerAnimation(), 1000);
			}
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
				startAnimation: () => triggerAnimation(),
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('normal');
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
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
					variants={brushBodyVariants}
					initial="normal"
					animate={controls}
					style={{ transformOrigin: "12px 12px" }}
				>
					{/* Paint blob/stroke effect */}
					<motion.ellipse
						cx="14"
						cy="13"
						rx="1"
						ry="0.5"
						variants={paintBlobVariants}
						initial="normal"
						animate={controls}
						fill="currentColor"
						stroke="none"
						opacity="0.6"
					/>

					{/* Additional paint splatter */}
					<motion.circle
						cx="15.5"
						cy="11.5"
						r="0.3"
						variants={paintBlobVariants}
						initial="normal"
						animate={controls}
						fill="currentColor"
						stroke="none"
						opacity="0.4"
					/>

					{/* Brush bristles */}
					<motion.path
						variants={bristlesVariants}
						initial="normal"
						animate={controls}
					/>

					{/* Brush tip/ferrule */}
					<motion.path
						variants={brushTipVariants}
						initial="normal"
						animate={controls}
					/>

					{/* Brush handle */}
					<motion.path
						variants={handleVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

Brush.displayName = 'Brush';