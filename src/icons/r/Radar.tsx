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

interface RadarHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RadarProps extends React.HTMLAttributes<HTMLDivElement> {
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

const beamVariants: any = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0.6, 1],
		transition: { duration: 0.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
	},
};

export const Radar = forwardRef<RadarHandle, RadarProps>(
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
		const beamControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const triggerAnimation = useCallback(async () => {
			await Promise.all([
				controls.start('animate'),
				beamControls.start('animate'),
			]);
			await Promise.all([
				controls.start('normal'),
				beamControls.start('normal'),
			]);
			if (loopRef.current) triggerAnimation();
		}, [controls, beamControls]);

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
					controls.start('normal');
					beamControls.start('normal');
				},
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				controls.start('normal');
				beamControls.start('normal');
			}
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
					<motion.path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M4 6h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 18h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" variants={pathVariants} initial="normal" animate={controls} />
					<motion.circle cx="12" cy="12" r="2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="m13.41 10.59 5.66-5.66"
						variants={beamVariants}
						initial="normal"
						animate={beamControls}
					/>
				</svg>
			</div>
		);
	}
);

Radar.displayName = 'Radar';
