'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface RefreshCwHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RefreshCwProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const RefreshCw = forwardRef<RefreshCwHandle, RefreshCwProps>(
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
		const rotateControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const animate = useCallback(async () => {
			await rotateControls.start({
				rotate: [0, 360],
				transition: { duration: 0.8, ease: 'easeInOut' },
			});
			await pathControls.start((i) => ({
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.6,
					delay: i * 0.1,
					ease: 'easeInOut',
				},
			}));
			await pathControls.start('visible');
			await rotateControls.start({ rotate: 0 });

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
			if (!isControlledRef.current && hoverable) {
				pathControls.start('visible');
				rotateControls.start({ rotate: 0 });
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const paths = [
			'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
			'M21 3v5h-5',
			'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
			'M8 16H3v5',
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
				<motion.svg
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
					initial={{ rotate: 0 }}
					animate={rotateControls}
				>
					{paths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="visible"
							animate={pathControls}
							custom={i}
							variants={{ visible: { pathLength: 1, opacity: 1 } }}
						/>
					))}
				</motion.svg>
			</div>
		);
	}
);

RefreshCw.displayName = 'RefreshCw';
export { RefreshCw };
