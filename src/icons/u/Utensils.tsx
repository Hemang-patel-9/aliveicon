'use client';

import { motion, useAnimation } from 'framer-motion';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface UtensilsHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UtensilsProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const Utensils = forwardRef<UtensilsHandle, UtensilsProps>(
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
					duration: 0.4,
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

		const paths = [
			'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2',
			'M7 2v20',
			'M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z',
			'M21 15v7',
		];

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				onMouseEnter={(e) => {
					if (!isControlledRef.current && hoverable) animate();
					onMouseEnter?.(e);
				}}
				onMouseLeave={(e) => {
					if (!isControlledRef.current && hoverable) controls.start('visible');
					onMouseLeave?.(e);
				}}
				onClick={(e) => {
					if (animateOnClick) animate();
					onClick?.(e);
				}}
				{...props}
			>
				<svg
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

Utensils.displayName = 'Utensils';
export { Utensils };
