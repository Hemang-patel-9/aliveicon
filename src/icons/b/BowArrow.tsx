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

interface BowArrowHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BowArrowProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const bowStringVariants = {
	normal: {
		d: "M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17",
		transition: { duration: 0.2 }
	},
	pullBack: {
		d: "M17.575 12.582a11 11 0 0 1 0.548 7.527 1.17 1.17 0 0 1-1.914.597L13 15.5",
		transition: { duration: 0.3, ease: "easeOut" }
	}
};

const bowBottomVariants = {
	normal: {
		d: "M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05",
		transition: { duration: 0.2 }
	},
	pullBack: {
		d: "M8 11.5 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05",
		transition: { duration: 0.3, ease: "easeOut" }
	}
};

const arrowShaftVariants = {
	normal: {
		d: "M9.707 14.293 21 3",
		x: 0,
		y: 0,
		transition: { duration: 0.2 }
	},
	pullBack: {
		d: "M7.707 15.793 19 4.5",
		x: 0,
		y: 0,
		transition: { duration: 0.3, ease: "easeOut" }
	},
	shoot: {
		d: "M9.707 14.293 21 3",
		x: 20,
		y: -20,
		transition: { duration: 0.15, ease: "easeIn" }
	}
};

const arrowHeadVariants = {
	normal: {
		d: "M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z",
		x: 0,
		y: 0,
		opacity: 1,
		transition: { duration: 0.2 }
	},
	pullBack: {
		d: "M5 15.5a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 1.5 19.5H3a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L7.5 19.707A1.7 1.7 0 0 0 8 18.5v-2a1 1 0 0 0-1-1z",
		x: 0,
		y: 0,
		opacity: 1,
		transition: { duration: 0.3, ease: "easeOut" }
	},
	shoot: {
		d: "M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z",
		x: 20,
		y: -20,
		opacity: 0,
		transition: { duration: 0.15, ease: "easeIn" }
	}
};

export const BowArrow = forwardRef<BowArrowHandle, BowArrowProps>(
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
			// Pull back
			await controls.start('pullBack');
			// Hold briefly
			await new Promise(resolve => setTimeout(resolve, 150));
			// Shoot
			await controls.start('shoot');
			// Reset
			await new Promise(resolve => setTimeout(resolve, 300));
			await controls.start('normal');

			if (loopRef.current) {
				setTimeout(() => triggerAnimation(), 800);
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
					<motion.path
						d="M17 3h4v4"
						variants={{
							normal: { opacity: 1, x: 0, y: 0 },
							pullBack: { opacity: 1, x: -1.5, y: 1.5, transition: { duration: 0.3, ease: "easeOut" } },
							shoot: { opacity: 1, x: 20, y: -20, transition: { duration: 0.15, ease: "easeIn" } }
						}}
						initial="normal"
						animate={controls}
					/>

					<motion.path
						variants={bowStringVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						variants={bowBottomVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						variants={arrowHeadVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						variants={arrowShaftVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BowArrow.displayName = 'BowArrow';