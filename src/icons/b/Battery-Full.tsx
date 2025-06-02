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

interface BatteryFullHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BatteryFullProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const BatteryFull = forwardRef<BatteryFullHandle, BatteryFullProps>(
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
		const shellControls = useAnimation();
		const barsControls = [
			useAnimation(),
			useAnimation(),
			useAnimation(),
		];
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await shellControls.start('animate');
			for (let i = 0; i < barsControls.length; i++) {
				await barsControls[i].start('on');
			}
			if (loopRef.current) {
				await shellControls.start('normal');
				await Promise.all(barsControls.map(ctrl => ctrl.start('off')));
				triggerAnimation();
			}
		}, [shellControls, barsControls]);

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
				stopAnimation: () => {
					shellControls.start('normal');
					barsControls.forEach(ctrl => ctrl.start('off'));
				},
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				shellControls.start('normal');
				barsControls.forEach(ctrl => ctrl.start('off'));
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		const shellVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: { duration: 0.5, ease: 'easeInOut' },
			},
		};

		const barVariants = {
			off: { opacity: 0 },
			on: {
				opacity: [0, 1],
				transition: { duration: 0.3 },
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
					{/* Battery shell */}
					<motion.rect
						x="2"
						y="7"
						width="16"
						height="10"
						rx="2"
						ry="2"
						variants={shellVariants}
						initial="normal"
						animate={shellControls}
					/>
					{/* Battery terminal */}
					<motion.line
						x1="22"
						y1="11"
						x2="22"
						y2="13"
						variants={shellVariants}
						initial="normal"
						animate={shellControls}
					/>
					{/* Battery bars */}
					<motion.line
						x1="6"
						y1="11"
						x2="6"
						y2="13"
						variants={barVariants}
						initial="off"
						animate={barsControls[0]}
					/>
					<motion.line
						x1="10"
						y1="11"
						x2="10"
						y2="13"
						variants={barVariants}
						initial="off"
						animate={barsControls[1]}
					/>
					<motion.line
						x1="14"
						y1="11"
						x2="14"
						y2="13"
						variants={barVariants}
						initial="off"
						animate={barsControls[2]}
					/>
				</svg>
			</div>
		);
	}
);

BatteryFull.displayName = 'BatteryFull';
