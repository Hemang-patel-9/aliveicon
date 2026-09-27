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

interface BoomBoxHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BoomBoxProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

// Shake animation for the whole boom box
const boomBoxVariants = {
	normal: {
		x: 0,
		y: 0,
		rotate: 0,
		transition: { duration: 0.3 }
	},
	playing: {
		x: [0, -0.5, 0.5, -0.3, 0.3, 0],
		y: [0, -0.2, 0.2, -0.1, 0.1, 0],
		rotate: [0, -0.3, 0.3, -0.2, 0.2, 0],
		transition: {
			duration: 0.6,
			repeat: 2,
			ease: "easeInOut"
		}
	}
};

// Pulse animation for speakers
const speakerVariants = {
	normal: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.2 }
	},
	playing: {
		scale: [1, 1.1, 0.95, 1.05, 1],
		opacity: [1, 0.8, 1, 0.9, 1],
		transition: {
			duration: 0.4,
			repeat: 3,
			ease: "easeInOut"
		}
	}
};

// Bounce animation for volume sliders
const sliderVariants = {
	normal: {
		scaleY: 1,
		y: 0,
		transition: { duration: 0.2 }
	},
	playing: {
		scaleY: [1, 1.3, 0.8, 1.2, 1],
		y: [0, -0.5, 0.3, -0.2, 0],
		transition: {
			duration: 0.5,
			repeat: 3,
			ease: "easeInOut",
			staggerChildren: 0.1
		}
	}
};

// Individual slider animations with different timings
const slider1Variants = {
	normal: sliderVariants.normal,
	playing: {
		...sliderVariants.playing,
		transition: {
			...sliderVariants.playing.transition,
			delay: 0
		}
	}
};

const slider2Variants = {
	normal: sliderVariants.normal,
	playing: {
		...sliderVariants.playing,
		transition: {
			...sliderVariants.playing.transition,
			delay: 0.1
		}
	}
};

const slider3Variants = {
	normal: sliderVariants.normal,
	playing: {
		...sliderVariants.playing,
		transition: {
			...sliderVariants.playing.transition,
			delay: 0.2
		}
	}
};

// Subtle glow effect for the main body
const bodyVariants = {
	normal: {
		filter: "brightness(1)",
		transition: { duration: 0.3 }
	},
	playing: {
		filter: ["brightness(1)", "brightness(1.1)", "brightness(0.95)", "brightness(1.05)", "brightness(1)"],
		transition: {
			duration: 0.8,
			repeat: 2,
			ease: "easeInOut"
		}
	}
};

export const BoomBox = forwardRef<BoomBoxHandle, BoomBoxProps>(
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
			// Start playing animation
			await controls.start('playing');
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
					variants={boomBoxVariants}
					initial="normal"
					animate={controls}
				>
					{/* Top handle */}
					<motion.path
						d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"
						variants={{
							normal: { opacity: 1 },
							playing: { opacity: 1 }
						}}
						initial="normal"
						animate={controls}
					/>

					{/* Volume sliders */}
					<motion.path
						d="M8 8v1"
						variants={slider1Variants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: "8px 8.5px" }}
					/>
					<motion.path
						d="M12 8v1"
						variants={slider2Variants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: "12px 8.5px" }}
					/>
					<motion.path
						d="M16 8v1"
						variants={slider3Variants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: "16px 8.5px" }}
					/>

					{/* Main body */}
					<motion.rect
						width="20"
						height="12"
						x="2"
						y="9"
						rx="2"
						variants={bodyVariants}
						initial="normal"
						animate={controls}
					/>

					{/* Left speaker */}
					<motion.circle
						cx="8"
						cy="15"
						r="2"
						variants={speakerVariants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: "8px 15px" }}
					/>

					{/* Right speaker */}
					<motion.circle
						cx="16"
						cy="15"
						r="2"
						variants={speakerVariants}
						initial="normal"
						animate={controls}
						style={{ transformOrigin: "16px 15px" }}
					/>
				</motion.svg>
			</div>
		);
	}
);

BoomBox.displayName = 'BoomBox';