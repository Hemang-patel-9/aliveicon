'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface ChartBarBigHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartBarBigProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

export const ChartBarBig = forwardRef<ChartBarBigHandle, ChartBarBigProps>(
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
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
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
						d="M3 3v16a2 2 0 0 0 2 2h16"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="7"
						y="13"
						width="9"
						height="4"
						rx="1"
						initial={{ opacity: 1 }}
						animate={controls}
						variants={{
							normal: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
							animate: {
								opacity: [0, 1],
								scale: [0.8, 1],
								transition: { duration: 0.7, ease: 'easeInOut' },
							},
						}}
					/>
					<motion.rect
						x="7"
						y="5"
						width="12"
						height="4"
						rx="1"
						initial={{ opacity: 1 }}
						animate={controls}
						variants={{
							normal: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
							animate: {
								opacity: [0, 1],
								scale: [0.8, 1],
								transition: { duration: 0.7, ease: 'easeInOut' },
							},
						}}
					/>
				</svg>
			</div>
		);
	}
);

ChartBarBig.displayName = 'ChartBarBig';
