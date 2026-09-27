'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface WineHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WineProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const Wine = forwardRef<WineHandle, WineProps>(
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

		const animate = useCallback(async () => {
			await controls.start((i) => ({
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.6,
					delay: i * 0.08,
					ease: 'easeInOut',
				},
			}));
			await controls.start('visible');
			if (loopRef.current) animate();
		}, [controls]);

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
				stopAnimation: () => controls.start('visible'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) animate();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
			if (!isControlledRef.current && hoverable) controls.start('visible');
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const paths = [
			'M8 22h8',
			'M7 10h10',
			'M12 15v7',
			'M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z',
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
							initial={false}
							animate={controls}
							custom={i}
							variants={{
								visible: { pathLength: 1, opacity: 1 },
							}}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Wine.displayName = 'Wine';
export { Wine };
