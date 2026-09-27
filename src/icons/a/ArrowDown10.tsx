'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface ArrowDown10Handle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowDown10Props extends React.HTMLAttributes<HTMLDivElement> {
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

const zeroVariants = {
	initial: { y: 0 },
	animate: {
		y: [10, 0, 10],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const oneVariants = {
	initial: { y: 0 },
	animate: {
		y: [-10, 0, -10],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const ArrowDown10 = forwardRef<ArrowDown10Handle, ArrowDown10Props>(
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
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
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
					aria-hidden="true"
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
						d="m3 16 4 4 4-4"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 20V4" />
					<motion.rect
						x="15"
						y="4"
						width="4"
						height="6"
						ry="2"
						variants={zeroVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="M17 20v-6h-2"
						variants={oneVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path d="M15 20h4" variants={oneVariants} initial="initial" animate={controls} />
				</svg>
			</div>
		);
	}
);

ArrowDown10.displayName = 'ArrowDown10';
