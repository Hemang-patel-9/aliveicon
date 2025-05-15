'use client';
import { useAnimation, motion } from 'framer-motion';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface ArrowUpProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	isBounce?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const bounceVariant = {
	normal: {
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 15,
		},
	},
	animate: {
		scale: 1.2,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 10,
		},
	},
};

const lineVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			opacity: { duration: 0.1 },
		},
	},
};

const bouncePathVariants = {
	hidden: {
		pathLength: 0,
		opacity: 0,
	},
	visible: (i: number) => ({
		pathLength: 1,
		opacity: 1,
		transition: {
			pathLength: { delay: i * 0.1, duration: 0.4, ease: 'easeInOut' },
			opacity: { delay: i * 0.1, duration: 0.2 },
		},
	}),
};

export function ArrowUp({
	size = 28,
	className,
	style,
	autoAnimateOnLoad = false,
	hoverable = true,
	loopOnHover = false,
	animateOnClick = false,
	isBounce = false,
	onMouseEnter,
	onMouseLeave,
	onClick,
	...props
}: ArrowUpProps) {
	const controls = useAnimation();
	const loopRef = useRef(loopOnHover);

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

	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		if (hoverable) triggerAnimation();
		onMouseEnter?.(e);
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		if (hoverable) controls.start('normal');
		onMouseLeave?.(e);
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (animateOnClick) triggerAnimation();
		onClick?.(e);
	};

	const paths = [
		"M3.5 13h6",               // horizontal part of the "A"
		"m2 16 4.5-9 4.5 9",       // the "A" structure stays same
		"M18 16V7",                // arrow line, now reversed (was 7→16, now 16→7)
		"m22 12-4-4-4 4",          // arrow head pointing upward
	];

	return (
		<div
			className={cn('inline-block', className)}
			style={{
				width: size,
				height: size,
				...style,
			}}
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
				variants={isBounce ? bounceVariant : undefined}
				animate={isBounce ? controls : undefined}
				initial={isBounce ? 'normal' : undefined}
			>
				{paths.map((d, i) => (
					<motion.path
						key={i}
						d={d}
						variants={isBounce ? bouncePathVariants : lineVariants}
						initial={isBounce ? 'hidden' : 'normal'}
						animate={isBounce ? 'visible' : controls}
						custom={i}
					/>
				))}
			</motion.svg>
		</div>
	);
}
