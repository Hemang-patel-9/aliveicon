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

interface ZoomInHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ZoomInProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const ZoomIn = forwardRef<ZoomInHandle, ZoomInProps>(({
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
				delay: i * 0.15,
				duration: 0.5,
				ease: 'easeInOut',
			},
		}),
	};

	const paths: { d: string; key: string }[] = [
		{ d: 'M11 8v6', key: 'v-line' },
		{ d: 'M8 11h6', key: 'h-line' },
		{ d: 'M21 21l-4.35-4.35', key: 'zoom-line' },
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
				<motion.circle
					cx="11"
					cy="11"
					r="8"
					variants={pathVariants}
					initial="normal"
					animate={controls}
					custom={0}
				/>
				{paths.map((p, i) => (
					<motion.path
						key={p.key}
						d={p.d}
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={i + 1}
					/>
				))}
			</svg>
		</div>
	);
});

ZoomIn.displayName = 'ZoomIn';
export { ZoomIn };
