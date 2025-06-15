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

interface UserRoundCogHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UserRoundCogProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const UserRoundCog = forwardRef<UserRoundCogHandle, UserRoundCogProps>(
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
					delay: i * 0.1,
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
			if (!isControlledRef.current && hoverable) animate();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('visible');
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const paths = [
			'm14.305 19.53.923-.382',
			'm15.228 16.852-.923-.383',
			'm16.852 15.228-.383-.923',
			'm16.852 20.772-.383.924',
			'm19.148 15.228.383-.923',
			'm19.53 21.696-.382-.924',
			'M2 21a8 8 0 0 1 10.434-7.62',
			'm20.772 16.852.924-.383',
			'm20.772 19.148.924.383',
		];

		const circles = [
			{ cx: 10, cy: 8, r: 5 },
			{ cx: 18, cy: 18, r: 3 },
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
					{circles.map((c, i) => (
						<motion.circle
							key={`circle-${i}`}
							cx={c.cx}
							cy={c.cy}
							r={c.r}
							initial="visible"
							animate={controls}
							custom={i}
							variants={{
								visible: {
									pathLength: 1,
									opacity: 1,
								},
							}}
						/>
					))}
					{paths.map((d, i) => (
						<motion.path
							key={`path-${i}`}
							d={d}
							initial="visible"
							animate={controls}
							custom={i + circles.length}
							variants={{
								visible: {
									pathLength: 1,
									opacity: 1,
								},
							}}
						/>
					))}
				</svg>
			</div>
		);
	}
);

UserRoundCog.displayName = 'UserRoundCog';
export { UserRoundCog };
