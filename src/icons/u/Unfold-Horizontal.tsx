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

interface UnfoldHorizontalHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UnfoldHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const UnfoldHorizontal = forwardRef<UnfoldHorizontalHandle, UnfoldHorizontalProps>(
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
		const arrowControls = useAnimation();
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

			await arrowControls.start({
				x: [0, -4, 0, 0, 4, 0],
				scale: [1, 1.1, 1, 1, 1.1, 1],
				transition: {
					duration: 1,
					ease: [0.6, 0.01, -0.05, 0.95],
					times: [0, 0.25, 0.5, 0.5, 0.75, 1]
				}
			});

			await pathControls.start('visible');
			if (loopRef.current) animate();
		}, [pathControls, arrowControls]);

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
					arrowControls.start({ x: 0 });
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
				arrowControls.start({ x: 0 });
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const staticPaths = [
			'M16 12h6',
			'M8 12H2',
			'M12 2v2',
			'M12 8v2',
			'M12 14v2',
			'M12 20v2',
		];
		const leftArrow = 'M5 9l-3 3 3 3';
		const rightArrow = 'M19 15l3-3-3-3';

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
					{staticPaths.map((d, i) => (
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

					<motion.path
						d={leftArrow}
						initial={{ opacity: 1 }}
						animate={arrowControls}
					/>
					<motion.path
						d={rightArrow}
						initial={{ opacity: 1 }}
						animate={arrowControls}
					/>
				</svg>
			</div>
		);
	}
);

UnfoldHorizontal.displayName = 'UnfoldHorizontal';
export { UnfoldHorizontal };
