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

interface NotepadTextDashedHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface NotepadTextDashedProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const NotepadTextDashed = forwardRef<
	NotepadTextDashedHandle,
	NotepadTextDashedProps
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
					<motion.path d="M8 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16 4h2a2 2 0 0 1 2 2v2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M20 12v2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M20 18v2a2 2 0 0 1-2 2h-1" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M13 22h-2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M7 22H6a2 2 0 0 1-2-2v-2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M4 14v-2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M4 8V6a2 2 0 0 1 2-2h2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 10h6" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 14h8" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 18h5" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

NotepadTextDashed.displayName = 'NotepadTextDashed';
