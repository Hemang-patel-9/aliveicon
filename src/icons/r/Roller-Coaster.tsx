'use client'

import { motion, useAnimation } from 'framer-motion'
import {
	forwardRef,
	useImperativeHandle,
	useRef,
	useCallback,
	useEffect,
	type HTMLAttributes,
} from 'react'

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface RollerCoasterHandle {
	startAnimation: () => void
	stopAnimation: () => void
}

interface RollerCoasterProps extends HTMLAttributes<HTMLDivElement> {
	size?: number
	autoAnimateOnLoad?: boolean
	hoverable?: boolean
	loopOnHover?: boolean
	animateOnClick?: boolean
}

const RollerCoaster = forwardRef<RollerCoasterHandle, RollerCoasterProps>(
	(
		{
			size = 28,
			className,
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
		const controls = useAnimation()
		const loopRef = useRef(loopOnHover)
		const isControlledRef = useRef(false)

		const animate = useCallback(async () => {
			await controls.start((i) => ({
				pathLength: [0, 1],
				opacity: [0.5, 1],
				transition: {
					duration: 0.6,
					delay: i * 0.05,
					ease: 'easeInOut',
				},
			}))
			await controls.start('visible')
			if (loopRef.current) animate()
		}, [controls])

		useEffect(() => {
			loopRef.current = loopOnHover
		}, [loopOnHover])

		useEffect(() => {
			if (autoAnimateOnLoad) animate()
		}, [autoAnimateOnLoad, animate])

		useImperativeHandle(ref, () => {
			isControlledRef.current = true
			return {
				startAnimation: animate,
				stopAnimation: () => controls.start('visible'),
			}
		})

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) animate()
			onMouseEnter?.(e)
		}

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable)
				controls.start('visible')
			onMouseLeave?.(e)
		}

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate()
			onClick?.(e)
		}

		const paths = [
			'M6 19V5',
			'M10 19V6.8',
			'M14 19v-7.8',
			'M18 5v4',
			'M18 19v-6',
			'M22 19V9',
			'M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65',
		]

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size }}
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
		)
	}
)

RollerCoaster.displayName = 'RollerCoaster'
export { RollerCoaster }
