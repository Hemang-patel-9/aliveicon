'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
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

export interface AngryHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AngryProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const DURATION = 0.7;

const faceVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 1.1, 0.95, 1.1, 1],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const eyebrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [-1, -3, -1],
		transition: { duration: DURATION, ease: 'easeOut' },
	},
};

const eyeVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 0.6, 1.2, 1],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const mouthVariants: Variants = {
	normal: { x: 0 },
	animate: {
		x: [-0.5, 0.5, -0.3, 0],
		transition: { duration: DURATION, ease: 'easeInOut' },
	},
};

const Angry = forwardRef<AngryHandle, AngryProps>(
	(
		{
			className,
			size = 28,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
			onMouseEnter,
			onMouseLeave,
			onClick,
			style,
			...props
		},
		ref
	) => {
		const controls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			await controls.start('normal');
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial="normal"
					animate={controls}
				>
					<motion.circle cx="12" cy="12" r="10" variants={faceVariants} />
					<motion.path
						d="M16 16s-1.5-2-4-2-4 2-4 2"
						variants={mouthVariants}
					/>
					<motion.path d="M7.5 8 10 9" variants={eyebrowVariants} />
					<motion.path d="m14 9 2.5-1" variants={eyebrowVariants} />
					<motion.path d="M9 10h.01" variants={eyeVariants} />
					<motion.path d="M15 10h.01" variants={eyeVariants} />
				</motion.svg>
			</div>
		);
	}
);

Angry.displayName = 'Angry';

export { Angry };
