'use client';

import { motion, useAnimation } from 'framer-motion';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | false | null)[]) {
	return twMerge(clsx(inputs));
}

interface YouTubeHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface YouTubeProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const YouTube = forwardRef<YouTubeHandle, YouTubeProps>(({
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
}, ref) => {
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

	const pathVariants = {
		normal: { pathLength: 1, opacity: 1 },
		animate: (i: number) => ({
			pathLength: [0, 1],
			opacity: [0, 1],
			transition: {
				delay: i * 0.2,
				duration: 0.5,
				ease: 'easeInOut',
			},
		}),
	};

	const paths: { d: string; key: string }[] = [
		{
			d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17',
			key: 'youtube-body',
		},
		{
			d: 'M10 15l5-3-5-3z',
			key: 'youtube-play',
		},
	];

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
				{paths.map((p, i) => (
					<motion.path
						key={p.key}
						d={p.d}
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={i}
					/>
				))}
			</svg>
		</div>
	);
});

YouTube.displayName = 'YouTube';
export { YouTube };
