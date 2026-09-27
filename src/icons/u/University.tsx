'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

export interface UniversityHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

export interface UniversityProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const University = forwardRef<UniversityHandle, UniversityProps>(
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
		const mainControls = useAnimation();
		const dotControls = useAnimation();
		const loopRef = useRef(loopOnHover);
		const isControlledRef = useRef(false);

		const animate = useCallback(async () => {
			await mainControls.start({
				pathLength: [0, 1],
				transition: { duration: 1, ease: 'easeInOut' },
			});
			await dotControls.start((i) => ({
				opacity: [0, 1],
				transition: { delay: i * 0.1, duration: 0.2 },
			}));
			if (loopRef.current) animate();
		}, [mainControls, dotControls]);

		useEffect(() => {
			loopRef.current = loopOnHover;
		}, [loopOnHover]);

		useEffect(() => {
			if (autoAnimateOnLoad) animate();
			else {
				mainControls.set({ pathLength: 1 });
				dotControls.set((_) => ({ opacity: 1 }));
			}
		}, [autoAnimateOnLoad, animate, mainControls, dotControls]);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: animate,
				stopAnimation: () => {
					mainControls.stop();
					dotControls.stop();
					mainControls.set({ pathLength: 1 });
					dotControls.set((_) => ({ opacity: 1 }));
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
				mainControls.set({ pathLength: 1 });
				dotControls.set((_) => ({ opacity: 1 }));
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path d="M14 21v-3a2 2 0 0 0-4 0v3" initial={false} animate={mainControls} />
					<motion.path
						d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"
						initial={false}
						animate={mainControls}
					/>
					<motion.path d="M12 2v1" initial={false} animate={mainControls} />
					<motion.circle
						cx="12"
						cy="10"
						r="2"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.4 }}
					/>
					{['M6 12h.01', 'M6 16h.01', 'M18 12h.01', 'M18 16h.01'].map((d, i) => (
						<motion.path key={i} d={d} initial={{ opacity: 0 }} animate={dotControls} custom={i} />
					))}
				</svg>
			</div>
		);
	}
);

University.displayName = 'University';
export { University };
