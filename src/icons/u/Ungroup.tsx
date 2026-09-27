'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface UngroupHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UngroupProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const Ungroup = forwardRef<UngroupHandle, UngroupProps>(
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
		const boxControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const animate = useCallback(async () => {
			await boxControls.start((i) => {
				const variants = [
					{
						opacity: [0, 1],
						x: [-4, 0],
						y: [-4, 0],
					},
					{
						opacity: [0, 1],
						x: [4, 0],
						y: [4, 0],
					},
				];
				return {
					...variants[i],
					transition: {
						duration: 0.5,
						ease: 'easeInOut',
					},
				};
			});

			if (loopRef.current) animate();
		}, [boxControls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) animate();
		}, [autoAnimateOnLoad, animate]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: animate,
				stopAnimation: () => {
					boxControls.start({ x: 0, y: 0, opacity: 1 });
				},
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) animate();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
			if (!isControlledRef.current && hoverable) {
				boxControls.start({ x: 0, y: 0, opacity: 1 });
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
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
					width="100%"
					height="100%"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						x="5"
						y="4"
						width="8"
						height="6"
						rx="1"
						initial={{ opacity: 1 }}
						animate={boxControls}
						custom={0}
					/>
					<motion.rect
						x="11"
						y="14"
						width="8"
						height="6"
						rx="1"
						initial={{ opacity: 1 }}
						animate={boxControls}
						custom={1}
					/>
				</svg>
			</div>
		);
	}
);

Ungroup.displayName = 'Ungroup';
export { Ungroup };
