'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useEffect, useImperativeHandle, useRef, useCallback } from 'react';
import { cn } from '../../lib/cn';

interface BotHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BotProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const Bot = forwardRef<BotHandle, BotProps>(
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
		const blinkControls = useAnimation();
		const isControlledRef = useRef(false);
		const loopRef = useRef(loopOnHover);

		const triggerAnimation = useCallback(async () => {
			await controls.start('animate');
			await controls.start('normal');
			blinkControls.start('blink');
			if (loopRef.current) triggerAnimation();
		}, [controls, blinkControls]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => {
					controls.start('animate');
					blinkControls.start('blink');
				},
				stopAnimation: () => {
					controls.start('normal');
					blinkControls.stop();
				},
			};
		});

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) triggerAnimation();
		}, [autoAnimateOnLoad, triggerAnimation]);

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = loopOnHover;
			if (!isControlledRef.current && hoverable) triggerAnimation();
			onMouseEnter?.(e);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			loopRef.current = false;
			if (!isControlledRef.current && hoverable) {
				controls.start('normal');
				blinkControls.stop();
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) triggerAnimation();
			onClick?.(e);
		};

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: { duration: 0.5 },
			},
		};

		const blinkVariants = {
			blink: {
				scaleY: [1, 0.1, 1],
				transition: {
					duration: 0.5,
					repeat: Infinity,
					repeatDelay: 2,
					ease: 'easeInOut',
				},
			},
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
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
				>
					<motion.path d="M12 8V4H8" initial="normal" animate={controls} />
					<motion.rect
						width="16"
						height="12"
						x="4"
						y="8"
						rx="2"
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M2 14h2" initial="normal" animate={controls} />
					<motion.path d="M20 14h2" initial="normal" animate={controls} />

					<motion.path d="M9 13v2" variants={pathVariants} initial="normal" animate={controls} />

					<motion.path
						d="M15 13v2"
						variants={blinkVariants}
						initial={false}
						animate={blinkControls}
						style={{ transformOrigin: 'center' }}
					/>
				</svg>
			</div>
		);
	}
);

Bot.displayName = 'Bot';
