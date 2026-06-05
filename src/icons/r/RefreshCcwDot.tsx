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

interface RefreshCcwDotHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RefreshCcwDotProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const RefreshCcwDot = forwardRef<RefreshCcwDotHandle, RefreshCcwDotProps>(
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
		const dotControls = useAnimation();
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
			await dotControls.start({
				scale: [0, 1],
				opacity: [0, 1],
				transition: { duration: 0.3, ease: 'easeOut' },
			});
			await pathControls.start('visible');
			await dotControls.start('visible');
			await rotateControls.start({ rotate: 0 });

			if (loopRef.current) animate();
		}, [pathControls, dotControls, rotateControls]);

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
					dotControls.start('visible');
					rotateControls.start({ rotate: 0 });
				},
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) animate();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) {
				pathControls.start('visible');
				dotControls.start('visible');
				rotateControls.start({ rotate: 0 });
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const paths = [
			'M3 2v6h6',
			'M21 12A9 9 0 0 0 6 5.3L3 8',
			'M21 22v-6h-6',
			'M3 12a9 9 0 0 0 15 6.7l3-2.7',
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
					<motion.circle
						cx="12"
						cy="12"
						r="1"
						initial="visible"
						animate={dotControls}
						variants={{ visible: { scale: 1, opacity: 1 } }}
					/>
				</motion.svg>
			</div>
		);
	}
);

RefreshCcwDot.displayName = 'RefreshCcwDot';
export { RefreshCcwDot };
