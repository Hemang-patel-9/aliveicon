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

interface QRCodeHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
};

export const QRCode = forwardRef<QRCodeHandle, QRCodeProps>(
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
					<motion.rect width="5" height="5" x="3" y="3" rx="1" variants={pathVariants} animate={controls} initial="normal" />
					<motion.rect width="5" height="5" x="16" y="3" rx="1" variants={pathVariants} animate={controls} initial="normal" />
					<motion.rect width="5" height="5" x="3" y="16" rx="1" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M21 16h-3a2 2 0 0 0-2 2v3" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M21 21v.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 7v3a2 2 0 0 1-2 2H7" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M3 12h.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 3h.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 16v.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M16 12h1" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M21 12v.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 21v-1" variants={pathVariants} animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

QRCode.displayName = 'QRCode';
