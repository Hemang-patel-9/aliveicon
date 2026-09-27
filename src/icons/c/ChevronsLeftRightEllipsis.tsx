'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface ChevronsLeftRightEllipsisHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronsLeftRightEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const ChevronsLeftRightEllipsis = forwardRef<
	ChevronsLeftRightEllipsisHandle,
	ChevronsLeftRightEllipsisProps
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
		const leftChevron = useAnimation();
		const rightChevron = useAnimation();
		const dots = useAnimation();

		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([
				leftChevron.start('animate'),
				rightChevron.start('animate'),
				dots.start('pulse'),
			]);
			await Promise.all([
				leftChevron.start('initial'),
				rightChevron.start('initial'),
				dots.start('initial'),
			]);
			if (loopRef.current) triggerAnimation();
		}, [leftChevron, rightChevron, dots]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: triggerAnimation,
				stopAnimation: () =>
					Promise.all([
						leftChevron.start('initial'),
						rightChevron.start('initial'),
						dots.start('initial'),
					]),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
			if (!isControlledRef.current && hoverable) {
				leftChevron.start('initial');
				rightChevron.start('initial');
				dots.start('initial');
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		const chevronLeftVariant = {
			initial: { x: 0 },
			animate: {
				x: [0, 3, 0],
				transition: { duration: 0.5, ease: 'easeInOut' },
			},
		};

		const chevronRightVariant = {
			initial: { x: 0 },
			animate: {
				x: [0, -3, 0],
				transition: { duration: 0.5, ease: 'easeInOut' },
			},
		};

		const dotPulse = {
			initial: { scale: 1, opacity: 1 },
			pulse: {
				scale: [1, 1.25, 1],
				opacity: [1, 0.6, 1],
				transition: {
					duration: 0.8,
					repeat: 1,
				},
			},
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path d="M12 12h.01" variants={dotPulse} initial="initial" animate={dots} />
					<motion.path d="M16 12h.01" variants={dotPulse} initial="initial" animate={dots} />
					<motion.path d="M8 12h.01" variants={dotPulse} initial="initial" animate={dots} />
					<motion.path
						d="M17 7l5 5-5 5"
						variants={chevronRightVariant}
						initial="initial"
						animate={rightChevron}
					/>
					<motion.path
						d="M7 7l-5 5 5 5"
						variants={chevronLeftVariant}
						initial="initial"
						animate={leftChevron}
					/>
				</svg>
			</div>
		);
	}
);

ChevronsLeftRightEllipsis.displayName = 'ChevronsLeftRightEllipsis';
