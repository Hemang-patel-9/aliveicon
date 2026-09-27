'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface VibrateHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface VibrateProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const Vibrate = forwardRef<VibrateHandle, VibrateProps>(
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
		const pathControls = useAnimation();
		const rectControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const animate = useCallback(async () => {
			await pathControls.start((i) => ({
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.4,
					delay: i * 0.08,
					ease: 'easeInOut',
				},
			}));

			await rectControls.start({
				x: [0, -2, 2, -2, 2, 0],
				transition: {
					duration: 0.4,
					ease: 'easeInOut',
				},
			});

			await pathControls.start('visible');
			if (loopRef.current) animate();
		}, [pathControls, rectControls]);

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
					rectControls.stop();
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
				pathControls.start('visible');
				rectControls.stop();
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const pathData = ['M2 8l2 2-2 2 2 2-2 2', 'M22 8l-2 2 2 2-2 2 2 2'];

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
					{pathData.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="visible"
							animate={pathControls}
							custom={i}
							variants={{ visible: { pathLength: 1, opacity: 1 } }}
						/>
					))}

					<motion.rect
						x="8"
						y="5"
						width="8"
						height="14"
						rx="1"
						initial={false}
						animate={rectControls}
					/>
				</svg>
			</div>
		);
	}
);

Vibrate.displayName = 'Vibrate';
export { Vibrate };
