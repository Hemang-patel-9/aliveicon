'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/cn';

interface UnfoldVerticalHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UnfoldVerticalProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number;
	className?: string;
	style?: React.CSSProperties;
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

const UnfoldVertical = forwardRef<UnfoldVerticalHandle, UnfoldVerticalProps>(
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
				y: [0, -4, 0, 0, 4, 0],
				scale: [1, 1.1, 1, 1, 1.1, 1],
				transition: {
					duration: 1,
					ease: [0.6, 0.01, -0.05, 0.95],
					times: [0, 0.25, 0.5, 0.5, 0.75, 1],
				},
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
					arrowControls.start({ y: 0 });
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
				arrowControls.start({ y: 0 });
			}
			onMouseLeave?.(e);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate();
			onClick?.(e);
		};

		const staticLines = ['M12 22v-6', 'M12 8V2', 'M4 12H2', 'M10 12H8', 'M16 12h-2', 'M22 12h-2'];

		const topArrow = 'M15 5L12 2L9 5';
		const bottomArrow = 'M15 19L12 22L9 19';

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
					{staticLines.map((d, i) => (
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

					<motion.path d={topArrow} initial={{ opacity: 1 }} animate={arrowControls} />
					<motion.path d={bottomArrow} initial={{ opacity: 1 }} animate={arrowControls} />
				</svg>
			</div>
		);
	}
);

UnfoldVertical.displayName = 'UnfoldVertical';
export { UnfoldVertical };
