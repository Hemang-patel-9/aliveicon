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

interface BellHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BellProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	swingAngle?: number;
	duration?: number;
	className?: string;
	style?: React.CSSProperties;
}

export const Bell = forwardRef<BellHandle, BellProps>(
	(
		{
			size = 48,
			className,
			style,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
			swingAngle = 15,
			duration = 1,
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

		const swingAnimation = useCallback(async () => {
			await controls.start({
				rotate: [-swingAngle, swingAngle, -swingAngle],
				transition: { duration, ease: 'easeInOut' },
			});
			if (loopRef.current) {
				swingAnimation();
			} else {
				await controls.start({ rotate: 0 });
			}
		}, [controls, duration, swingAngle]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) {
				swingAnimation();
			}
		}, [autoAnimateOnLoad, swingAnimation]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => swingAnimation(),
				stopAnimation: () => controls.start({ rotate: 0 }),
			};
		});

		function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
			if (!isControlledRef.current && hoverable) {
				swingAnimation();
			}
			onMouseEnter?.(e);
		}

		function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
			if (!isControlledRef.current && hoverable) {
				controls.start({ rotate: 0 });
			}
			onMouseLeave?.(e);
		}

		function handleClick(e: React.MouseEvent<HTMLDivElement>) {
			if (animateOnClick) {
				swingAnimation();
			}
			onClick?.(e);
		}

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
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
					style={{ originX: '50%', originY: '10%' }} // pivot near bell top
					animate={controls}
					initial={{ rotate: 0 }}
				>
					<path d="M10.268 21a2 2 0 0 0 3.464 0" />
					<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
				</motion.svg>
			</div>
		);
	}
);

Bell.displayName = 'Bell';
