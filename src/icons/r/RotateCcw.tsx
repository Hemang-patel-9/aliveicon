'use client';

import { motion, useAnimation, type HTMLMotionProps } from 'framer-motion';
import React, { forwardRef, useImperativeHandle, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../lib/cn';

interface RotateCcwHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RotateCcwProps extends HTMLMotionProps<'div'> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const RotateCcw = forwardRef<RotateCcwHandle, RotateCcwProps>(
	(
		{
			size = 28,
			className,
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
		const pathControls = useAnimation();
		const rotateControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const animate = useCallback(async () => {
			await Promise.all([
				pathControls.start(() => ({
					pathLength: 0,
					opacity: 0.5,
					transition: { duration: 0 },
				})),
				rotateControls.start({ rotate: 0, transition: { duration: 0 } }),
			]);

			await pathControls.start((i) => ({
				pathLength: [0, 1],
				opacity: [0.5, 1],
				transition: {
					duration: 0.6,
					delay: i * 0.1,
					ease: 'easeInOut',
				},
			}));

			await rotateControls.start({
				rotate: -360,
				transition: { duration: 0.6, ease: 'easeInOut' },
			});

			await rotateControls.start({ rotate: 0, transition: { duration: 0 } });

			if (loopRef.current) animate();
		}, [pathControls, rotateControls]);

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
					pathControls.start('visible');
					rotateControls.start({ rotate: 0 });
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
			if (!isControlledRef.current && hoverable) pathControls.start('visible');
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const paths = ['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5'];

		return (
			<motion.div
				className={cn('inline-block', className)}
				style={{ width: size, height: size }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				animate={rotateControls}
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
					{paths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="visible"
							animate={pathControls}
							custom={i}
							variants={{
								visible: { pathLength: 1, opacity: 1 },
							}}
						/>
					))}
				</svg>
			</motion.div>
		);
	}
);

RotateCcw.displayName = 'RotateCcw';
export { RotateCcw };
